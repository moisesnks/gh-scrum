// UserCard.js

import React from 'react';
import "./UserCard.css";

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <div className="user-avatar">
                <img src={user.photoURL} alt={user.displayName} className="avatar-image" />
            </div>
            <div className="user-details">
                <h3 className="user-name">{user.displayName}</h3>
                <p className="user-info">{user.email}</p>
                <p className="user-info">RUT: {user.rut}</p>
                <p className="user-info">Rol: {user.rol || 'No especificado'}</p>
                <p className="user-info">Cargo: {user.cargo || 'No especificado'}</p>
                <p className="user-info">Horas: {user.horas}</p>
            </div>
        </div>
    );
};

export default UserCard;
