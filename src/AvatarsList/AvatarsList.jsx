// AvatarsList.jsx
import React from 'react';
import Avatar from '../Avatar/Avatar';
import './AvatarsList.css';

const AvatarsList = ({ personas }) => {
    return (
        <div className="avatars-container">
            <div className="avatar-list">
                {personas.map(persona => (
                    <div className="avatar" key={persona.key}>
                        <Avatar data={persona} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AvatarsList;
