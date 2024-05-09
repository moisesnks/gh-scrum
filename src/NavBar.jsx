import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarsIcon } from './Icons';
import './NavBar.css';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const links = [
        { to: '/home', label: 'Home' },
        { to: '/home/form', label: 'Crear Tarea' },
        { to: '/home/kanban', label: 'Kanban' },
        { to: '/home/metrics', label: 'Métricas' },
        { to: '/home/teams', label: 'Equipos' },
        { to: '/home/users', label: 'Usuarios' },
        { to: '/home/profile', label: 'Perfil' },
        { to: '/home/about', label: 'Acerca de' },
    ];

    return (
        <div className={`topnav ${isMobileMenuOpen ? 'responsive' : ''}`}>
            {links.map(({ to, label }) => (
                <Link key={to} to={to} className="nav-link">
                    {label}
                </Link>
            ))}
            <div className="icon" onClick={toggleMobileMenu}>
                <BarsIcon />
            </div>
        </div>
    );
}

export default NavBar;
