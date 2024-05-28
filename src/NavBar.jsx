import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowIcon } from "./Icons";
import "./NavBar.css";
import { useAuth } from "./Hooks/useAuth";

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
    { to: "/home", label: "Home" },
    { to: "/home/form", label: "Crear Tarea", needsAdmin: true },
    // { to: '/home/kanban', label: 'Kanban' },
    { to: "/home/metrics", label: "Métricas", needsAdmin: true },
    // { to: '/home/teams', label: 'Equipos', needsAdmin: true },
    { to: "/home/users", label: "Usuarios", needsAdmin: true },
    // { to: '/home/profile', label: 'Perfil' },
    // { to: '/home/about', label: 'Acerca de' },
    { to: "/home/planning-poker", label: "Planning Poker" },
  ];

  const filteredLinks = isAdmin
    ? links
    : links.filter((link) => !link.needsAdmin);
  const initialLinks = filteredLinks.slice(0, 4);
  const extraLinks = filteredLinks.slice(4);

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {initialLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={location.pathname === link.to ? "active" : ""}
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
                {extraLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={location.pathname === link.to ? "active" : ""}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
        <li>
          <button onClick={logout}>
            salir
            <i className="fa fa-right-from-bracket"></i>
            </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
