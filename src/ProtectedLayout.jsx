import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";
import NavBar from "./NavBar";

import styled from 'styled-components';

const Main = styled.main`
margin: 0px 40px;
box-sizing: border-box;
background: rgba(39, 116, 198, 0.9);
border: 1px solid rgba(35, 106, 182, 0.5);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 8px;
height: calc(100vh - 120px);
width: calc(100vw - 80px);
color: white;
    `

export const ProtectedLayout = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <NavBar onLogout={logout} />
            <Main>
                <Outlet />
            </Main>
        </div>
    )
};

