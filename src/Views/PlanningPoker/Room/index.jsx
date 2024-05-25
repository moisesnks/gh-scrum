import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import UsersList from '../../../Components/UsersList/index.jsx';
import UsersVoted from '../../../Components/UsersVoted/index.jsx';
import Cartas from '../../../Components/Cartas/index.jsx';
import Chat from '../../../Components/Chat/index.jsx';
import Topico, { ChangeTopicModal } from '../../../Components/Topico/index.jsx';
import Resultados from '../../../Components/Resultados/index.jsx';

import { useAuth } from '../../../Hooks/useAuth';

import './Room.css';

const Room = () => {
    const { user } = useAuth();
    const roomName = window.location.pathname.split('/').pop();
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [topic, setTopic] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);
    const [isAdmin, setIsAdmin] = useState(user.role === 'admin');
    const [roomAlert, setRoomAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [todosVotaron, setTodosVotaron] = useState(false);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const newSocket = io('http://localhost:4000'); // Cambia a la URL de tu servidor si es diferente
        setSocket(newSocket);

        // Unirse a la sala
        newSocket.emit('joinRoom', { room: roomName, user });

        // Manejar eventos desde el servidor
        newSocket.on('init', ({ users, messages, topic }) => {
            setUsers(users);
            setMessages(messages);
            setTopic(topic);
            const currentUser = users.find(u => u.uid === user.uid);
            setCurrentUser(currentUser);
            setIsAdmin(currentUser.role === 'admin');
            newSocket.emit('getVote', { room: roomName, userId: currentUser.uid })
        });



        newSocket.on('updateUsers', setUsers);
        newSocket.on('updateMessages', setMessages);
        newSocket.on('newTopic', setTopic);
        newSocket.on('results', ({ users, results }) => {
            setUsers(users);
            setResults(results);
            setShowResults(true);
        });

        newSocket.on('receiveVote', (vote) => {
            setCurrentUser(prevUser => ({ ...prevUser, vote }));
        });

        newSocket.on('updateVotes', votes => {
            setUsers(prevUsers =>
                prevUsers.map(user => ({
                    ...user,
                    vote: votes[user.uid] ? votes[user.uid] : user.vote
                }))
            );
        });

        newSocket.on('resetRoom', ({ users, messages }) => {
            setUsers(users);
            setMessages(messages);
            setTopic('');
            setResults(null);
            setShowResults(false);
            setRoomAlert('Sala reiniciada correctamente');
        });

        newSocket.on('error', (error) => {
            setError(error.message);
        });

        return () => newSocket.close();
    }, [roomName, user]);

    useEffect(() => {
        if (currentUser.vote !== "") {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [currentUser.vote]);

    useEffect(() => {
        if (roomAlert !== "") {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setRoomAlert("");
            }, 3000);
        }
    }, [roomAlert]);

    useEffect(() => {
        if (error !== null) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError(null);
            }, 3000);
        }
    }, [error]);

    useEffect(() => {
        const allVotedWithoutAdmin = users.filter(u => u.role !== 'admin').every(u => u.vote !== "");
        setTodosVotaron(allVotedWithoutAdmin);

    }, [users]);

    useEffect(() => {
        if (results && results.avg === 0 && results.max === 0 && results.min === 0 && results.reset === true) {
            console.log("Se resetearon los resultados");
            setShowResults(false);
        } else if (results && results.avg !== 0 && results.max !== 0 && results.min !== 0) {
            setShowResults(true);
        }
    }, [results]);

    const handleClickCard = (card) => {
        if (currentUser.vote === card) {
            setCurrentUser({ ...currentUser, vote: "" });
            socket.emit('vote', { room: roomName, userId: currentUser.uid, vote: "" });
        } else {
            setCurrentUser({ ...currentUser, vote: card });
        }
    };

    const handleSendVote = () => {
        socket.emit('vote', { room: roomName, userId: currentUser.uid, vote: currentUser.vote });
        setRoomAlert('Voto enviado correctamente');
    };

    const handleReveal = () => {
        socket.emit('revealVotes', roomName);
    };

    const handleReset = () => {
        socket.emit('resetRoom', { room: roomName });
        setShowModal(true);
    };

    const handleSendMessage = (message) => {
        const newMessage = { content: message, user: currentUser };
        socket.emit('newMessage', { room: roomName, message: newMessage });
    };

    return (
        <div className="planning-poker">
            <aside className='side'>
                <UsersList users={users} />
                <Chat messages={messages} currentUser={currentUser} onSendMessage={handleSendMessage} />
            </aside>
            <main className='room'>
                {showModal ? (
                    <ChangeTopicModal
                        topic={topic}
                        setTopic={(newTopic) => {
                            setTopic(newTopic);
                            socket.emit('changeTopic', { room: roomName, newTopic });
                        }}
                        setShowModal={setShowModal}
                    />

                ) : (
                    <>
                        {!showResults ? (
                            <>
                                <Topico topic={topic} setTopic={(newTopic) => {
                                    setTopic(newTopic);
                                    socket.emit('changeTopic', { room: roomName, newTopic });
                                }} isAdmin={isAdmin} />
                                <UsersVoted users={users} />
                                {isAdmin && (
                                    <div className="admin-container">
                                        {todosVotaron ? (
                                            <button className='reveal-button' onClick={handleReveal}>
                                                Revelar votos
                                            </button>
                                        ) : (
                                            <span className='waiting-text'>
                                                Esperando que todos voten<span className='dots'></span>
                                            </span>
                                        )}
                                    </div>
                                )}
                                {!isAdmin && !showResults && (
                                    <div className="cartas-container">
                                        <Cartas initialCard={currentUser.vote} onClick={handleClickCard} />
                                        <button className='confirm-button' onClick={handleSendVote} disabled={!isSelected}>
                                            Confirmar voto
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="final">
                                <h2>Se han revelado las cartas</h2>
                                {isAdmin && (
                                    <button className='reset-button' onClick={handleReset}>
                                        Reiniciar sala
                                    </button>
                                )}
                            </div>
                        )}
                        {showAlert && <div className='alert info'>{roomAlert}</div>}
                        {showError && <div className='alert error'>{error}</div>}
                        {showResults && <Resultados results={results} />}
                    </>
                )}
            </main>
        </div>
    );
};

export default Room;
