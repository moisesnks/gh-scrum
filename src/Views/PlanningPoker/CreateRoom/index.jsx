import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const Input = styled.input`
    margin-bottom: 10px;    
`;

export const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.7;
    border-radius: 5px;
    &:hover {
        opacity: 1;
    }
`;

const ErrorButton = styled.button`
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

const Error = styled.div`
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    color: #721c24;
    background-color: #f8d7da;
`;

const CreateRoom = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState('');
    const [roomName, setRoomName] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Establece la conexión con el servidor de Socket.IO
        const newSocket = io('https://ztwwr726-4000.brs.devtunnels.ms'); // Cambia a la URL de tu servidor si es diferente
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

        return () => newSocket.close();
    }, [setSocket]);

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if (roomName.trim() !== '') {
            socket.emit('createRoom', { room: roomName, user });
            socket.on('init', () => {
                if (error === '') {
                    navigate(`/home/planning-poker/room/${roomName}`);
                }
            });
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
            <h2>Hola! {user.displayName}</h2>
            <Form onSubmit={handleCreateRoom}>
                <Input
                    type="text"
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    placeholder="Ingrese el nombre de la sala"
                />
                <Button type="submit">Crear sala</Button>
            </Form>
        </Container>
    );
}

export default CreateRoom;
