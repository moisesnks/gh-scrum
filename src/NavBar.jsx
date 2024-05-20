import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarsIcon } from './Icons';
import './NavBar.css';
import { useAuth } from './Hooks/useAuth';

const NavBar = () => {
    const { logout, isAdmin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const links = [
        { to: '/home', label: 'Home' },
        { to: '/home/form', label: 'Crear Tarea', needsAdmin: true },
        { to: '/home/kanban', label: 'Kanban' },
        { to: '/home/metrics', label: 'Métricas', needsAdmin: true },
        { to: '/home/teams', label: 'Equipos', needsAdmin: true },
        { to: '/home/users', label: 'Usuarios', needsAdmin: true },
        { to: '/home/profile', label: 'Perfil' },
        { to: '/home/about', label: 'Acerca de' },
        { to: '/home/planning-poker', label: 'Planning Poker' }
    ];

    return (
        <div className={`topnav ${isMobileMenuOpen ? 'responsive' : ''}`}>
            <div className="icon" onClick={toggleMobileMenu}>
                <BarsIcon />
            </div>
            {links.map(({ to, label, needsAdmin }) => (
                // Renderizar el enlace solo si no necesita ser administrador o si el usuario es un administrador
                (!needsAdmin || (needsAdmin && isAdmin)) && (
                    <Link key={to} to={to} className="nav-link">
                        {label}
                    </Link>
                )
            ))}
            <button className="logout-button" onClick={logout}>
                Salir
            </button>
        </div>
    );
}

export default NavBar;
