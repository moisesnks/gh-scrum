import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarsIcon, GithubIcon } from './Icons';

const NavBar = ({ onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav>
            <div className="nav-container">
                <div className="routes">
                    <div className="links">
                        <Link to="/home" onClick={closeMobileMenu}>Home</Link>
                        <Link to="/home/form" onClick={closeMobileMenu}>Crear Tarea</Link>
                    </div>
                    {onLogout && <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>}
                </div>
                <div className="mobile-menu">
                    <button className="menu-icon" onClick={toggleMobileMenu}>
                        <BarsIcon />
                    </button>
                    {onLogout && <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>}
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-menu-dropdown">
                    <Link to="/home" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/home/form" onClick={closeMobileMenu}>Crear Tarea</Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
