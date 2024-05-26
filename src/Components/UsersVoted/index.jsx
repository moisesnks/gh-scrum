import React, { useState, useEffect, useRef } from 'react';

import './UsersVoted.css';

function UsersVoted({ users }) {
    return (
        <div className="users-voted">
            {users.map((user) => (
                <div key={user.uid} className={user.vote !== "" && user.vote !== undefined ? 'voted' : 'not-voted'}>
                    <img src={user.photoURL} alt={user.displayName} />
                </div>
            ))}
        </div>
    );
}

export default UsersVoted;
