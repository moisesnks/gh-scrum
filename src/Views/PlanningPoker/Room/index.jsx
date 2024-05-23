// Path: src/Views/PlanningPoker/Room/index.jsx
import React from "react";
import PlanningTable from "../../../Components/PlanningTable";

const users = [
    { id: 1, name: 'John Doe', role: 'Participant', selectedCard: '1' },
    { id: 2, name: 'Jane Doe', role: 'Participant', selectedCard: '2' },
    { id: 3, name: 'John Smith', role: 'Participant', selectedCard: '2' },
    { id: 4, name: 'Jane Smith', role: 'Participant', selectedCard: '2' },
    { id: 5, name: 'John Johnson', role: 'Participant', selectedCard: '3' },
    { id: 6, name: 'Jane Johnson', role: 'Participant', selectedCard: '' },
    { id: 7, name: 'John Brown', role: 'Participant', selectedCard: '' },
    { id: 8, name: 'Jane Brown', role: 'Participant', selectedCard: '' },
];



const distributeUsers = (users) => {
    // Distribute users into 4 groups, top, right, bottom, left
    // dinamically based on the number of users
    const top = [];
    const right = [];
    const bottom = [];
    const left = [];

    users.forEach((user, index) => {
        if (index < 3) {
            top.push(user);
        } else if (index < 5) {
            right.push(user);
        } else if (index < 7) {
            bottom.push(user);
        } else {
            left.push(user);
        }
    });

    const obj = {
        top,
        right,
        bottom,
        left,
    };

    return obj;
}

import useRoom from "./useRoom";
import { useAuth } from "../../../Hooks/useAuth";

const Room = () => {
    const { user, getName } = useAuth();

    let userName = getName();

    const { room, loading, error, createRoom, joinRoom, getRoom, vote, revealVotes } = useRoom(userName);

    const usersList = distributeUsers(users);

    return (

        <div className="container">
            <h1>Planning Poker Room</h1>
            <h2>Hola, {userName}</h2>
            {/* <PlanningTable users={usersList} /> */}
        </div>
    );
}

export default Room;
