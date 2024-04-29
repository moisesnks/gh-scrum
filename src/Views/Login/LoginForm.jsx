import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import './LoginForm.css';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const { user, loading, error, login, logout } = useAuth(); // Obtén las funciones de autenticación del contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (user) {
        // Navegar directamnete a la página de inicio si el usuario ya está autenticado
        return <Navigate to="/home" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Llama a la función de inicio de sesión del contexto
        } catch (error) {
        }
    };

    return (
        <div className="login-form-container">
            <h2 className="login-title">Inicio de Sesión</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    Iniciar Sesión
                </button>
            </form>
            {loading && <p className="loading-text">Cargando...</p>}
            {error && <p className="error-text">Error: {error}</p>}
        </div>
    );
};

export default LoginForm;
