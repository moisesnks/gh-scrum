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

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            auth: { uid: user.uid, name: user.displayName }
        });

        newSocket.on('connect', () => {
            setSocket(newSocket);

            // Unirse a la sala correspondiente al conectarse
            newSocket.emit('joinRoom', roomName);
        });

        // Manejo del evento 'roomInfo' para actualizar el estado con la información de la sala
        newSocket.on('roomInfo', (info) => {
            setRoomInfo(info.users);
        });

        return () => {
            setSocket(null);
            newSocket.disconnect();
        };
    }, [user.uid]);


    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomName.trim() !== '') {
            socket.emit('joinRoom', roomName);
            if (error === '') {
                navigate(`/home/planning-poker/room/${roomName}`);
            }

        } else {
            alert('Por favor ingrese un nombre para la sala.');
        }
    };

    return (
        <>
            {error ? (
                <Container>
                    <Error>{error}</Error>
                    <ErrorButton onClick={() => setError('')}>Close</ErrorButton>
                </Container>

            ) : (
                <Container>
                    <Form onSubmit={handleJoinRoom}>
                        <Input
                            type="text"
                            placeholder="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <Button type="submit">Join Room</Button>
                    </Form>
                </Container>
            )}
        </>
    );
};

export default JoinRoom;
