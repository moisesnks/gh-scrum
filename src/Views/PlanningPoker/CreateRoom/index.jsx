// Path: Views/PlanningPoker/CreateRoom/index.jsx

import React, { useState } from 'react';
import { createRoom } from '../api';

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('');

    const handleCreateRoom = (e) => {
        e.preventDefault();
        createRoom({ roomName });
    }

    return (
        <form onSubmit={handleCreateRoom}>
            <input
                type="text"
                placeholder="Nombre de la sala"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button type="submit">Crear sala</button>
        </form>
    );
}

export default CreateRoom;