// Path: Views/PlanningPoker/CreateRoom/index.jsx

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


const CreateRoom = () => {
    const { user } = useAuth(); // user es un user de Firebase, entonces tenemos por ejemplo
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            auth: { uid: user.uid, name: user.displayName }
        });

        setSocket(socket);

        socket.on('connect', () => {

        });


        return () => {
            setSocket(null);
            socket.disconnect();

        }
    }, [user.uid]);


    const [roomName, setRoomName] = useState('');

    const handleCreateRoom = (e) => {
        e.preventDefault();
        if (roomName.trim() !== '') {
            console.log("Creando sala", roomName);
            socket.emit('createRoom', { roomName });
            navigate(`/home/planning-poker/room/${roomName}`);
        } else {
            alert('Por favor ingrese un nombre para la sala.');
        }
    };

    return (
        <Container>
            <h2> Hola! {user.displayName} </h2>
            <Form onSubmit={handleCreateRoom}>
                <Input
                    type="text"
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                    placeholder="Ingrese el nombre de la sala"
                />
                <Button type="submit"> Crear sala </Button>
            </Form>
        </Container>
    );
}

export default CreateRoom;