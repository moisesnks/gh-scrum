import React, { useState } from 'react';
import './AddUserModal.css';

import {
    FormName,
    FormRut,
    FormEmail,
    FormRol,
    FormCargo,
    FormHoras,
    FormTeam,
} from '../FormField';

const AddUserModal = ({ addUser }) => {
    const [visible, setVisible] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [rut, setRut] = useState('');
    const [rol, setRol] = useState('');
    const [cargo, setCargo] = useState('');
    const [horas, setHoras] = useState('');
    const [team, setTeam] = useState('');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault(); // Prevenir la recarga de la página
        const userData = { displayName, email, rut, rol, cargo, horas, team };
        const success = await addUser(userData);
        if (success) {
            setVisible(false);
            setDisplayName('');
            setEmail('');
            setRut('');
            setRol('');
            setCargo('');
            setHoras('');
            setTeam('');
        }
    };

    const handleCancel = () => {
        setVisible(false);
        setDisplayName('');
        setEmail('');
        setRut('');
    };


    return (
        <div>
            <button className="add-user-button" onClick={showModal}>
                Añadir Persona
            </button>
            {visible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Añadir Persona</h2>
                        <form onSubmit={handleOk}>
                            <label htmlFor="displayName">Nombre:</label>
                            <FormName handleFieldChange={(e) => setDisplayName(e.target.value)} />
                            <label htmlFor="email">Correo Electrónico:</label>
                            <FormEmail handleFieldChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="rut">RUT:</label>
                            <FormRut handleFieldChange={(e) => setRut(e.target.value)} />
                            <label htmlFor="rol">Rol:</label>
                            <FormRol handleFieldChange={(e) => setRol(e.target.value)} />
                            <label htmlFor="cargo">Cargo:</label>
                            <FormCargo handleFieldChange={(e) => setCargo(e.target.value)} />
                            <label htmlFor="horas">Horas:</label>
                            <FormHoras handleFieldChange={(e) => setHoras(e.target.value)} />
                            <label htmlFor="team">Equipo:</label>
                            <FormTeam handleFieldChange={(e) => setTeam(e.target.value)} />
                            <div className="button-container">
                                <button type="submit" className="add-button">
                                    Agregar
                                </button>
                                <button type="button" className="cancel-button" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUserModal;
