import React, { useState, useEffect } from 'react';

import UsersList from '../../../Components/UsersList/index.jsx';
import UsersVoted from '../../../Components/UsersVoted/index.jsx';
import Cartas from '../../../Components/Cartas/index.jsx';
import Chat from '../../../Components/Chat/index.jsx';
import Topico, { ChangeTopicModal } from '../../../Components/Topico/index.jsx';
import Resultados from '../../../Components/Resultados/index.jsx';

import { useAuth } from '../../../Hooks/useAuth';

import './Room.css';

function Room() {
    const { user } = useAuth(); // user es un user de Firebase, entonces tenemos por ejemplo

    const [users, setUsers] = useState([
        { displayName: 'Simon Carrasco', photoURL: 'https://avatars.githubusercontent.com/u/130523104?v=4', online: true, uid: '1', vote: '5' },
        { displayName: 'Moisés Leiva', photoURL: 'https://avatars.githubusercontent.com/u/79491798?v=4', online: true, uid: '12', role: 'admin' },
        { displayName: 'Manuel Luque', photoURL: 'https://ui-avatars.com/api/?name=Manuel+Luque&background=random&color=fff', online: false, uid: '13', vote: '8' },
        { displayName: 'Jorge Salgado', photoURL: 'https://ui-avatars.com/api/?name=Jorge+Salgado&background=random&color=fff', online: true, uid: '14', vote: '5' },
        { displayName: 'John Doe', photoURL: 'https://ui-avatars.com/api/?name=John+Doe&background=random&color=fff', online: true, uid: '15', vote: '3' },
        { displayName: 'Jane Doe', photoURL: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random&color=fff', online: true, uid: '16', vote: '8' },
        { displayName: 'Juan Perez', photoURL: 'https://ui-avatars.com/api/?name=Juan+Perez&background=random&color=fff', online: true, uid: '17', vote: '5' },
        { displayName: 'Maria Perez', photoURL: 'https://ui-avatars.com/api/?name=Maria+Perez&background=random&color=fff', online: true, uid: '18', vote: '8' },
        { displayName: 'Pedro Perez', photoURL: 'https://ui-avatars.com/api/?name=Pedro+Perez&background=random&color=fff', online: true, uid: '19', vote: '5' },
        { displayName: 'Pablo Perez', photoURL: 'https://ui-avatars.com/api/?name=Pablo+Perez&background=random&color=fff', online: true, uid: '20', vote: '2' },

    ]);

    const [messages, setMessages] = useState([
        { id: '1', user: users[0], content: 'Hola' },
        { id: '2', user: users[1], content: 'Hola' },
        { id: '3', user: users[0], content: '¿Cómo están?' },
        { id: '4', user: users[1], content: 'Bien, gracias' },
        { id: '5', user: users[2], content: 'Hola' },
        { id: '6', user: users[2], content: '¿Cómo están?' },
        { id: '7', user: users[1], content: 'Estoy bien, ¿y tú?' },
        { id: '8', user: users[2], content: 'Un poco cansado, pero bien' },
        { id: '9', user: users[0], content: 'Me alegra escuchar eso' },
        { id: '10', user: users[1], content: 'Gracias 😊' },
        { id: '11', user: users[0], content: '¿Alguien sabe a qué hora es la reunión?' },
        { id: '12', user: users[1], content: 'Creo que es a las 3 PM' },
        { id: '13', user: users[2], content: 'Sí, confirmo que es a esa hora' },
        { id: '14', user: users[0], content: 'Perfecto, gracias 👍' },
        { id: '15', user: users[2], content: '¿Quieren tomar café más tarde? ☕' },
        { id: '16', user: users[1], content: '¡Claro! Me encantaría' },
    ]);

    const [topic, setTopic] = useState('Un microservicio para obtener en tiempo real la información de las monedas digitales más populares');
    const [isSelected, setIsSelected] = useState(false);
    const [currentUser, setCurrentUser] = useState({ ...users[1] });
    const [isAdmin, setIsAdmin] = useState(currentUser.role === 'admin' ? true : false);
    const [roomAlert, setRoomAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [todosVotaron, setTodosVotaron] = useState(false);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (currentUser.vote !== "") {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [currentUser.vote]);

    // useEffect para que cuando roomAlert cambie se muestre por 3 segundos
    useEffect(() => {
        if (roomAlert !== "") {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setRoomAlert("");
            }, 3000);
        }
    }, [roomAlert]);

    // useEffect para cuando error cambie se muestre por 3 segundos
    useEffect(() => {
        if (error !== null) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setError(null);
            }, 3000);
        }
    }, [error]);

    // useEffect para cuando cambia el tópico, ya que cuando cambia, 
    // se emitirá un evento hacia el servidor para solicitar que se limpien los votos para comenzar una nueva ronda
    useEffect(() => {
        // Lógica para solicitar al servidor que limpie los votos
        console.log('Se ha cambiado el tópico:', topic);
        console.log('Se ha solicitado al servidor que limpie los votos');
        setResults(null);
        setShowResults(false);
    }, [topic]);

    // useEffect que escucha cada cambio en users, para verificar si todos los usuarios han votado
    // debe buscar que todos los con rol distinto de admin tengan un voto diferente de ""
    useEffect(() => {
        // Recorre el array de users y verifica si todos los usuarios han votado
        const allVoted = users.every(user => user.role === 'admin' || user.vote !== "");
        setTodosVotaron(allVoted);
    }, [users]);

    // useEffect que escucha cambios en results, para cambiar el estado de showResults
    useEffect(() => {
        if (results) {
            setShowResults(true);
        } else if (results && results.reset) {
            setShowResults(false);
        }
    }, [results]);


    const handleClickCard = (card) => {
        if (currentUser.vote === card) {
            setCurrentUser({ ...currentUser, vote: "" });
        } else {
            setCurrentUser({ ...currentUser, vote: card });
        }
    };

    const handleSendVote = () => {
        // Lógica para enviar el voto
        console.log('Voto enviado:', currentUser.vote);
        setRoomAlert('Voto enviado correctamente');
    };

    const simulateReveal = () => {
        // Simula la respuesta del servidor con los votos para revelar
        const Results = {
            avg: 5.5,
            min: 2,
            max: 8,
            ratio: 50
        };

        setResults(Results);
    };

    const handleReveal = () => {
        // Lógica para enviar al servidor que revele los votos
        console.log('Se ha solicitado al servidor que revele los votos');
        simulateReveal();
    }

    const handleReset = () => {
        setShowModal(true);
    }

    return (
        <div className="planning-poker">
            <aside className='side'>
                <UsersList users={users} />
                <Chat messages={messages} currentUser={currentUser} />
            </aside>
            <main className='room'>
                {showModal ? (
                    <ChangeTopicModal topic={topic} setTopic={setTopic} setShowModal={setShowModal} />
                ) : (
                    <>
                        {!showResults ? (
                            <>
                                <Topico topic={topic} setTopic={setTopic} isAdmin={isAdmin} />
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
                                    <Cartas handleClickCard={handleClickCard} isSelected={isSelected} />
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
}

export default Room;




