import React, { useState } from 'react';
import "./UserCard.css";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { options } from '../Tareas/TaskForm';

const rolOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'guest', label: 'Invitado' },
];

const TeamOptions = [
    { value: 'management-team', label: 'Equipo de gestión' },
    { value: 'development-team', label: 'Equipo de desarrollo' },
];

const UserCard = ({ user, isEditable, isSelected, onSelect, updateUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user }); // Clonar el usuario para edición

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        updateUser(user.id, editedUser);
        setEditMode(false);
    };

    const handleCancelClick = () => {
        // Si se cancela la edición, volvemos al usuario original
        setEditedUser({ ...user });
        setEditMode(false);
    };

    const handleFieldChange = (e, key) => {
        const { value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [key]: value,
        }));
    };

    return (
        <div className={`user-card ${isSelected ? 'selected' : ''}`}>
            <div className="user-avatar">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(user.id)}
                />
                <img src={editedUser.photoURL} alt={editedUser.displayName} className="avatar-image" />
            </div>
            <div className="user-details">
                {isEditable && (
                    <button className="edit-button" onClick={handleEditClick}>
                        <FaPencilAlt />
                    </button>
                )}
                <p>Nombre: {editMode ? (
                    <input
                        type="text"
                        value={editedUser.displayName}
                        onChange={(e) => handleFieldChange(e, 'displayName')}
                        className="edit-input"
                    />
                ) : (
                    editedUser.displayName
                )}</p>
                <p>Email: {editedUser.email}</p>
                <p>RUT: {editedUser.rut}</p>
                <p>Rol: {editMode ? (
                    <select
                        value={editedUser.rol}
                        onChange={(e) => handleFieldChange(e, 'rol')}
                        className="edit-input"
                    >
                        {rolOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                ) : (
                    editedUser.rol || 'No especificado'
                )}</p>
                <p>Cargo: {editMode ? (
                    <select
                        value={editedUser.cargo}
                        onChange={(e) => handleFieldChange(e, 'cargo')}
                        className="edit-input"
                    >
                        {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                ) : (
                    editedUser.cargo || 'No especificado'
                )}</p>
                <p>Horas: {editMode ? (
                    <input
                        type="number"
                        value={editedUser.horas}
                        onChange={(e) => handleFieldChange(e, 'horas')}
                        className="edit-input"
                    />
                ) : (
                    editedUser.horas
                )}</p>
                <p>Equipo: {editMode ? (
                    <select
                        value={editedUser.team}
                        onChange={(e) => handleFieldChange(e, 'team')}
                        className="edit-input"
                    >
                        {TeamOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                ) : (
                    editedUser.team || 'No especificado'
                )}</p>
                {editMode && (
                    <div className="edit-actions">
                        <button className="save-button" onClick={handleSaveClick}>
                            <FaCheck /> Guardar
                        </button>
                        <button className="cancel-button" onClick={handleCancelClick}>
                            <FaTimes /> Cancelar
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserCard;
