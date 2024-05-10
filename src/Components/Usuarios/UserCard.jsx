import React, { useState } from 'react';
import "./UserCard.css";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import {
    FormName,
    FormRol,
    FormCargo,
    FormHoras,
    FormTeam,
} from '../FormField';

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
                <div className="checkbox-input">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(user.id)}
                    />
                </div>
                <img src={editedUser.photoURL} alt={editedUser.displayName} className="avatar-image" />
            </div>
            <div className="user-details">
                <div className="edit-btn">
                    {isEditable && !editMode && (
                        <button className="edit-button" onClick={handleEditClick}>
                            <FaPencilAlt />
                        </button>
                    )}
                </div>
                <div className="row">
                    <span>Nombre: {editMode ? (
                        <FormName editedUser={editedUser} handleFieldChange={handleFieldChange} />

                    ) : (
                        editedUser.displayName
                    )}</span>
                    <span>Email: {editedUser.email}</span>
                    <span>RUT: {editedUser.rut}</span>
                </div>
                <div className="hr"></div>
                <div className="row">
                    <span>Rol: {editMode ? (
                        <FormRol editedUser={editedUser} handleFieldChange={handleFieldChange} />
                    ) : (
                        editedUser.rol || 'No especificado'
                    )}</span>
                    <span>Cargo: {editMode ? (
                        <FormCargo editedUser={editedUser} handleFieldChange={handleFieldChange} />

                    ) : (
                        editedUser.cargo || 'No especificado'
                    )}</span>
                    <span>Horas: {editMode ? (
                        <FormHoras editedUser={editedUser} handleFieldChange={handleFieldChange} />

                    ) : (
                        editedUser.horas
                    )}</span>
                    <span>Equipo: {editMode ? (
                        <FormTeam editedUser={editedUser} handleFieldChange={handleFieldChange} />

                    ) : (
                        editedUser.team || 'No especificado'
                    )}</span>
                </div>
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
