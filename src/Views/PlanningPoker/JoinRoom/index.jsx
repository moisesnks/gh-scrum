// Path: Views/PlanningPoker/JonRoom/index.jsx

import React, { useState } from 'react';
import { joinRoom } from '../api';

const JoinRoom = () => {
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = (e) => {
        e.preventDefault();
        joinRoom({ roomId, playerName });
    };

    return (
        <form onSubmit={handleJoinRoom}>
            <input
                type="text"
                value={roomId}
                onChange={(event) => setRoomId(event.target.value)}
                placeholder="Room ID"
            />
            <input
                type="text"
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                placeholder="Your name"
            />
            <button type="submit">Join room</button>
        </form>
    );
};

export default JoinRoom;