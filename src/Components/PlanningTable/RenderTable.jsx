import './styles.css';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';

function RenderTable({ users, onReveal, onEncrypt, isRevealed }) {
    const [countdown, setCountdown] = useState(null);
    const { user } = useAuth();
    const uid = user.uid;

    // Encuentra al usuario admin
    const adminUser = users.find(user => user.role === "admin");
    const isAdmin = adminUser && adminUser.uid === uid;

    useEffect(() => {
        if (isRevealed && countdown === null && isAdmin) {
            setCountdown(3);
        }
    }, [isRevealed]);


    useEffect(() => {
        if (countdown !== null) {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                clearInterval(interval);
                setCountdown(null);
                onEncrypt();
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [countdown, onEncrypt]);

    const handleReveal = () => {
        onReveal();
        setCountdown(3);
    };

    const isReady = users.every(user => user.selectedCard !== null);

    return (
        <div className="table-module table-content">
            {isReady ? (
                <div className="table-content reveal-button-wrapper">
                    {countdown === null ? (
                        isAdmin && (
                            <button onClick={handleReveal}>
                                Revelar cartas
                            </button>
                        )
                    ) : (
                        <div>{countdown}</div>
                    )}
                </div>
            ) : (
                <div>Esperando a que todos voten...</div>
            )}
        </div>
    );
}

export default RenderTable;
