// Path: src/Views/PlanningPoker/Room/index.jsx
import React, { useState, useEffect } from "react";
import PlanningTable from "../../../Components/PlanningTable";

const users = [
    { id: 1, name: 'John Doe', role: 'Participant', selectedCard: '1' },
    { id: 2, name: 'Jane Doe', role: 'Participant', selectedCard: '2' },
    { id: 3, name: 'John Smith', role: 'Participant', selectedCard: '2' },
    { id: 4, name: 'Jane Smith', role: 'Participant', selectedCard: '2' },
    { id: 5, name: 'John Johnson', role: 'Participant', selectedCard: '3' },
    { id: 6, name: 'Jane Johnson', role: 'Participant', selectedCard: '1' },
    { id: 7, name: 'John Brown', role: 'Participant', selectedCard: '2' },
    { id: 8, name: 'Jane Brown', role: 'Participant', selectedCard: '1' },
];


const distributeUsers = (users) => {
    // Distribute users into 4 groups, top, right, bottom, left
    // dinamically based on the number of users
    const top = [];
    const right = [];
    const bottom = [];
    const left = [];

    users.forEach((user, index) => {
        if (index < 3) {
            top.push(user);
        } else if (index < 5) {
            right.push(user);
        } else if (index < 7) {
            bottom.push(user);
        } else {
            left.push(user);
        }
    });

    const obj = {
        top,
        right,
        bottom,
        left,
    };

    return obj;
}

import styled from "styled-components";

const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 150px;
    border-radius: 5px;
    background-color: ${({ selected }) => selected ? '#ffc107' : '#f8f9fa'};
    color: ${({ selected }) => selected ? '#212529' : '#5a6268'};
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 5px;
    &:hover {
        background-color: ${({ selected }) => selected ? '#ffc107' : '#e9ecef'};
        transform: translateY(-5px);
    }
`;

const ListCards = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const SelectChoice = ({ onSelect, initialSelectedCard = '' }) => {


    const [selectedCard, setSelectedCard] = useState(initialSelectedCard);


    const handleSelect = (card) => {
        // Si la misma carta se selecciona dos veces seguidas, deseleccionarla
        if (selectedCard === card) {
            setSelectedCard(null);
            onSelect(null); // Emitir null para indicar que la carta se ha deseleccionado
        } else {
            setSelectedCard(card);
            onSelect(card);
        }
    };

    return (
        <ListCards>
            <Card selected={selectedCard === '1'} onClick={() => handleSelect('1')}>1</Card>
            <Card selected={selectedCard === '2'} onClick={() => handleSelect('2')}>2</Card>
            <Card selected={selectedCard === '3'} onClick={() => handleSelect('3')}>3</Card>
            <Card selected={selectedCard === '5'} onClick={() => handleSelect('5')}>5</Card>
            <Card selected={selectedCard === '8'} onClick={() => handleSelect('8')}>8</Card>
        </ListCards>
    );
};


const StatusIndicator = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 5px;
    background-color: ${props => (props.$isOnline ? 'green' : 'red')};
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
`;

const UserItem = ({ user }) => {
    return (
        <ListItem>
            <span>{user.name}</span>
            <StatusIndicator $isOnline={user.online} />
        </ListItem>
    );
};

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const UsersList = ({ users }) => {
    return (
        <div>
            <h2>Usuarios</h2>
            <List>
                {users.map((user) => (
                    <UserItem user={user} key={user.uid} />
                ))}
            </List>
        </div>
    );
};

// Alerta es un div estilizado que muestra un mensaje
const Alert = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 5px;
    margin-top: 1rem;
`;

const AlertError = styled(Alert)`
    background-color: #f8d7da;
    color: #721c24;
`;

// Message es una función que retorna un Alert con un mensaje y dura 2 segundos en pantalla y luego desaparece
const Message = ({ message, setInfoMessage }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            setInfoMessage(''); // Limpia el mensaje después de que se oculta
        }, 2000);

        return () => clearTimeout(timer); // Limpia el timer al desmontar
    }, []);

    return show ? <Alert>{message}</Alert> : null;
};

const Error = ({ message }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return show ? <AlertError>{message}</AlertError> : null;
};



import { useAuth } from "../../../Hooks/useAuth";
import { io } from "socket.io-client";
import { Spinner } from "theme-ui";

const Room = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [roomInfo, setRoomInfo] = useState([]);
    const roomName = window.location.pathname.split('/').pop();
    const [users, setUsers] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [error, setError] = useState('');
    const [isRevealed, setIsRevealed] = useState(false);


    useEffect(() => {
        if (!user) return null;

        const newSocket = io('http://localhost:5000', {
            auth: { uid: user.uid, name: user.displayName }
        });

        newSocket.on('connect', () => {
            setSocket(newSocket);
            newSocket.emit('joinRoom', { roomName });

            newSocket.emit('getChoice', roomName);

            newSocket.on('choice', (choice) => {
                setSelectedCard(choice.selectedCard);
            });

            newSocket.emit('getUsers', roomName);


            newSocket.on('votesRevealed', (info) => {
                console.log("Se han revelado los votos", info);
                setUsers(info.users);
                setIsRevealed(true);
            });

            newSocket.on('votesEncrypted', (info) => {
                console.log("Se han encriptado los votos", info);
                setUsers(info.users);
            });

            newSocket.on('message', (info) => {
                console.log(info.message);
                setInfoMessage(info.message);
            });

            newSocket.on('roomError', (error) => {
                console.error(error);
                setError(error);
            });

            newSocket.on('cardVoted', (info) => {
                console.log(info.message);
                setInfoMessage(info.message);
            });

        });
        return () => {
            newSocket.emit('leaveRoom', { roomName });
            newSocket.disconnect();
            setSocket(null);
        };
    }, []);


    useEffect(() => {
        if (!socket) return;

        socket.emit('getRoomInfo', roomName);

        socket.on('roomInfo', (info) => {
            setUsers(info.users);
        });

        return () => {
            socket.off('roomInfo');
        };
    }, [infoMessage]);

    const handleRevealVotes = () => {
        socket.emit('revealVotes', roomName);
    };

    const handleEncryptVotes = () => {
        socket.emit('encryptVotes', roomName);
    }


    const handleSelectCard = (card) => {
        const newSelectedCard = selectedCard === card ? null : card;
        setSelectedCard(newSelectedCard);
        socket.emit('vote', { roomName, selectedCard: newSelectedCard });
    };

    if (!users) return <Spinner text="Cargando..." />

    return (
        <div className="container">
            <h1>Planning Poker Room</h1>
            <h2>Hola, {user?.displayName}</h2>
            {infoMessage && <Message message={infoMessage} setInfoMessage={setInfoMessage} />}
            {error && <Error message={error.message} />}
            <SelectChoice onSelect={handleSelectCard} initialSelectedCard={selectedCard} />
            {users && <UsersList users={users} />}
            {users && <PlanningTable users={distributeUsers(users)} onReveal={handleRevealVotes} onEncrypt={handleEncryptVotes} isRevealed={isRevealed} />}
        </div>
    );
}

export default Room;