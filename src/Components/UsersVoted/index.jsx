import React, { useState, useEffect, useRef } from 'react';

import './UsersVoted.css';

function UsersVoted({ users }) {
    // users es un array de user
    // user es : 
    // {
    //     displayName: 'Simon Carrasco',
    //     photoURL: 'https://avatars.githubusercontent.com/u/130523104?v=4',
    //     online: true,
    //     uid: '1',
    //     vote: '5'
    // }

    // Si su vote es distinto de != y de undefined, entonces tiene clase 'voted'
    // Si no, tiene clase 'not-voted'
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
