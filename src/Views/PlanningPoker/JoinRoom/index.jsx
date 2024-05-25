import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { io } from 'socket.io-client';
import { Container, Form, Input, Button } from '../CreateRoom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const ErrorButton = styled.button`
    background-color: #dc3545;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    border-radius: 5px;
    &:hover {
        opacity: 1;
    }
`;

export const Error = styled.div`
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    color: #721c24;
    background-color: #f8d7da;
`;

const JoinRoom = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [roomName, setRoomName] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Establece la conexión con el servidor de Socket.IO
        const newSocket = io('http://localhost:4000'); // Cambia a la URL de tu servidor si es diferente
        setSocket(newSocket);

        newSocket.on('connect', () => {
            setConnected(true);
        });

        // Maneja los eventos de error
        newSocket.on('connect_error', () => {
            setError('No se pudo conectar con el servidor');
        });

        newSocket.on('error', (error) => {
            setError(error.message);
        });

        return () => {
            newSocket.off('connect');
            newSocket.off('connect_error');
            newSocket.off('error');
        }
    }, [setSocket]);

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomName.trim() !== '') {
            navigate(`/home/planning-poker/room/${roomName}`);
        } else {
            alert('Por favor ingrese un nombre para la sala.');
        }
    };

    if (error) {
        return (
            <Container>
                <Error>{error}</Error>
                <ErrorButton onClick={() => setError('')}>Cerrar</ErrorButton>
            </Container>
        );
    }

    if (!connected) {
        return <Container>Cargando...</Container>;
    }

    return (
        <Container>
            <Form onSubmit={handleJoinRoom}>
                <Input
                    type="text"
                    placeholder="Nombre de la sala"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <Button type="submit">Unirse a la sala</Button>
            </Form>
        </Container>
    );
};

export default JoinRoom;
