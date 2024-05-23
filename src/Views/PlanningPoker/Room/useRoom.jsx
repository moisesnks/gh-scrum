import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

const useRoom = (username) => {
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            query: { username }
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log(`${username} connected to WebSocket server`);
        });

        newSocket.on('disconnect', () => {
            console.log(`${username} disconnected from WebSocket server`);
        });

        newSocket.on('connect_error', (err) => {
            console.error(`Connection error: ${err.message}`);
            setError('Connection error');
        });

        return () => {
            newSocket.close();
        };
    }, [username]);

    const createRoom = useCallback((creator, topic) => {
        setLoading(true);
        setError(null);
        socket.emit('createRoom', { creator, topic }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setRoom(response.room);
            }
            setLoading(false);
        });
    }, [socket]);

    const joinRoom = useCallback((username, roomId) => {
        setLoading(true);
        setError(null);
        socket.emit('joinRoom', { username, roomId }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setRoom(response.player);
            }
            setLoading(false);
        });
    }, [socket]);

    const getRoom = useCallback((roomId) => {
        setLoading(true);
        setError(null);
        socket.emit('getRoom', { roomId }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setRoom(response);
            }
            setLoading(false);
        });
    }, [socket]);

    const vote = useCallback((roomId, playerId, vote) => {
        setLoading(true);
        setError(null);
        socket.emit('vote', { roomId, playerId, vote }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setRoom(response.room);
            }
            setLoading(false);
        });
    }, [socket]);

    const revealVotes = useCallback((roomId) => {
        setLoading(true);
        setError(null);
        socket.emit('revealVotes', { roomId }, (response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setRoom(response.room);
            }
            setLoading(false);
        });
    }, [socket]);

    return { room, loading, error, createRoom, joinRoom, getRoom, vote, revealVotes };
};

export default useRoom;
