import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSave }) => {
    const [displayName, setDisplayName] = useState('');
    const [rut, setRut] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargo, setCargo] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [equipo, setEquipo] = useState('');

    const cargoOptions = [
        'infra-lead',
        'tech-lead',
        'sec-lead',
        'product-lead',
        'scrum-master',
        'devops',
        'backend',
        'frontend',
        'qa',
        'sec',
    ];

    const teamOptions = [
        'management-team',
        'development-team',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { displayName, rut, photoURL, email, password, cargo, capacidad, equipo };
        onSave(newUser);
        setDisplayName('');
        setRut('');
        setPhotoURL('');
        setEmail('');
        setPassword('');
        setCargo('');
        setCapacidad('');
        setEquipo('');
    };

    const fibonacci = [1, 2, 3, 5, 8, 13, 21];

    const handleCardClick = (option) => {
        setCapacidad(option === capacidad ? '' : option);
    };

    return (
        <form onSubmit={handleSubmit} className="user-form h-100">
            <button type="submit">Crear Usuario</button>
            <div className="h-100 overflow-container">
                <div className="form-group">
                    <input type="text" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                    <label>Display Name</label>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Rut" value={rut} onChange={(e) => setRut(e.target.value)} required />
                    <label>Rut</label>
                </div>
                <div className="form-group">
                    <input type="url" placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                    <label>Photo URL</label>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Email</label>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Password</label>
                </div>
                <div className="form-group">
                    <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
                        <option value="">Selecciona un cargo</option>
                        {cargoOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label className="always-visible">Cargo</label>
                </div>
                <div className="form-group">
                    <select value={equipo} onChange={(e) => setEquipo(e.target.value)} required>
                        <option value="">Selecciona un equipo</option>
                        {teamOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label className="always-visible">Equipo</label>
                </div>
                <div className="form-group">
                    <div className={`card-container ${capacidad ? 'not-empty' : ''}`}  >
                        {fibonacci.map((option) => (
                            <div
                                key={option}
                                className={`card ${capacidad === option ? 'selected' : ''}`}
                                onClick={() => handleCardClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <label className="always-visible">Capacidad</label>
                </div>
            </div>
        </form>
    );
};

export default UserForm;
