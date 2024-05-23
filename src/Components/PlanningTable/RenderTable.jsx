// Path: src/Components/PlanningTable/RenderTable.jsx
import './styles.css';
import React from 'react';

function RenderTable({ users, onReveal }) {
    const isRevealed = users.every(user => user.selectedCard !== "");
    const [countdown, setCountdown] = React.useState(null);

    const handleReveal = () => {
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setCountdown(null);
            onReveal();
        }, 3000);
    };

    return (
        <>
            {/* Table */}
            <div className="table-module table-content">
                {isRevealed ?
                    <div className="table-content reveal-button-wrapper">
                        {countdown === null ? (
                            <button onClick={handleReveal}>
                                Revelar cartas
                            </button>
                        ) : (
                            <div>{countdown} </div>
                        )}
                    </div>
                    :
                    <div>Esperando a que todos voten...</div>
                }
            </div>
        </>
    );
}

export default RenderTable;