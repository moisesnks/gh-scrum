import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon } from './Icons';
import './NavBar.css';
import { useAuth } from './Hooks/useAuth';

const NavBar = () => {
    const { logout, isAdmin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [arrowColor, setArrowColor] = useState("#CCCCCC");

    const location = useLocation();

    const handleMouseEnter = () => {
        setArrowColor("#FFFFFF");
    };

    const handleMouseLeave = () => {
        setArrowColor("#CCCCCC");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const links = [
        { to: '/home', label: 'Home' },
        // { to: '/home/kanban', label: 'Kanban' },
        { to: '/home/metrics', label: 'Métricas' },
        // { to: '/home/teams', label: 'Equipos', needsAdmin: true },
        { to: '/home/users', label: 'Usuarios', needsAdmin: true },
        // { to: '/home/about', label: 'Acerca de' },
        { to: '/home/asistencia', label: 'Asistencia' },
        { to: '/home/planning-poker', label: 'Planning Poker' },
        { to: '/home/profile', label: 'Perfil' },

        // { to: '/home/retrospective', label: 'Retrospectiva' },

    ];

    const filteredLinks = isAdmin ? links : links.filter(link => !link.needsAdmin);
    const n = 7;
    const initialLinks = filteredLinks.slice(0, n);
    const extraLinks = filteredLinks.slice(n);

    return (

        <div className="flex jc-sb">
            <nav className="navbar">
                <ul className="navbar-links">
                    {initialLinks.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {extraLinks.length > 0 && (
                        <li className="dropdown">
                            <button onClick={toggleSubMenu} className="dropdown-button">
                                <div
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ArrowIcon color={arrowColor} />
                                </div>
                            </button>
                            {isSubMenuOpen && (
                                <ul className="dropdown-menu">
                                    {extraLinks.map(link => (
                                        <li key={link.to}>
                                            <Link
                                                to={link.to}
                                                className={location.pathname === link.to ? 'active' : ''}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            <div className="navbar logout" onClick={logout}>
                <i className="fas fa-sign-out-alt" ></i>
            </div>
        </div>

    );
}

export default NavBar;
