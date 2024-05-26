import React, { useState, useEffect } from 'react';
import { Link, Navigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../Hooks/useAuth';
import Spinner from '../../utils/Spinner';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
`;

const LinksContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const LinkButton = styled(Link)`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export { Container, Title, LinksContainer, LinkButton };

const PlanningPoker = () => {
    const { user, updateDisplayName } = useAuth();

    async function setDisplayName() {
        const displayName = prompt('Ingrese su nombre');
        if (displayName) {
            await updateDisplayName(displayName);
        }
        window.location.reload();
    };

    function Render() {
        return (
            <Container>
                <Title>Bienvenido {user.displayName.split(' ')[0]} a la Planning Poker!</Title>
                <LinksContainer>
                    <LinkButton to="create-room">Create Room</LinkButton>
                    <LinkButton to="join-room">Join Room</LinkButton>
                    <LinkButton to="room">Room</LinkButton>
                </LinksContainer>
            </Container>
        )
    }

    if (user.displayName) {
        return Render();
    } else {
        setDisplayName();
    }
};


export default PlanningPoker;
