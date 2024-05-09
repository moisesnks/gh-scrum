import React, { useState } from 'react';
import './AddUserModal.css';

const AddUserModal = ({ addUser }) => {
    const [visible, setVisible] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [rut, setRut] = useState('');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        const userData = { displayName, email, rut };
        const success = await addUser(userData);
        if (success) {
            setVisible(false);
            setDisplayName('');
            setEmail('');
            setRut('');
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
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="rut">RUT:</label>
                            <input
                                type="text"
                                id="rut"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                required
                            />
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
