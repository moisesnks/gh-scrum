// Path: src/Components/PlanningTable/RenderUser.jsx
import './styles.css';
import React from 'react';

function RenderUser({ user, isRevealed }) {
    const isRevealedClass = isRevealed ? "revealed" : "";
    const classCard = user.selectedCard ? `card-container selected ${isRevealedClass}` : "card-container";
    return (
        <div className="table-module player-container">
            <div className="player-module player-wrapper">
                <div className={`player-module ${classCard}`}>
                    {isRevealed && user.selectedCard ? user.selectedCard : ""}
                </div>
                <div className="player-module profile-container">
                    {user.displayName}
                </div>
            </div>
        </div>
    );
}

export default RenderUser;