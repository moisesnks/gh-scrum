import React, { useState, useEffect } from 'react';
import useUserApi from './api';
import Spinner from '../../utils/Spinner';
import { FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';
import './UserDetails.css';

const roles = ['user', 'admin', 'manager'];
const cargos = ['front', 'back', 'fullstack'];
const equipos = ['development-team', 'design-team', 'marketing-team'];

const UserDetails = ({ id }) => {
    const { getUser, updateUser, deleteUserById, loading, error } = useUserApi();
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser(id);
            setUser(fetchedUser);
            setEditedUser({ ...fetchedUser });
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <Spinner text={`Buscando el usuario ${id}...`} />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>No se encontró el usuario.</p>;
    }

    const handleUpdateUser = async () => {
        await updateUser(editedUser);
        setUser(editedUser);
        setEditMode(false);
    };

    const handleDeleteUser = async () => {
        await deleteUserById(id);
        // Logic to handle user deletion
    };

    const handleFieldChange = (e, key) => {
        const { value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [key]: value,
        }));
    };

    return (
        < div className="user-card-container">
            <div className="user-card details">
                <div className="user-avatar">
                    <img src={user.photoURL} alt={user.displayName} className="avatar-image" />
                    <h1>{user.displayName}</h1>
                    <div className="edit-btn">
                        {!editMode && (
                            <button className="edit-button" onClick={() => setEditMode(true)}>
                                <FaPencilAlt />
                            </button>
                        )}
                    </div>
                </div>
                <div className="overflow-container">
                    <div className="user-meta">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>RUT:</strong> {user.rut}</p>
                        <p><strong>Nombre:</strong> {editMode ? (
                            <input type="text" value={editedUser.displayName} onChange={(e) => handleFieldChange(e, 'displayName')} />
                        ) : (
                            user.displayName
                        )}</p>
                        <p><strong>Rol:</strong> {editMode ? (
                            <select value={editedUser.rol} onChange={(e) => handleFieldChange(e, 'rol')}>
                                {roles.map((rol) => (
                                    <option key={rol} value={rol}>{rol}</option>
                                ))}
                            </select>
                        ) : (
                            user.rol
                        )}</p>
                        <p><strong>Equipo:</strong> {editMode ? (
                            <select value={editedUser.team} onChange={(e) => handleFieldChange(e, 'team')}>
                                {equipos.map((team) => (
                                    <option key={team} value={team}>{team}</option>
                                ))}
                            </select>
                        ) : (
                            user.team
                        )}</p>
                        <p><strong>Cargo:</strong> {editMode ? (
                            <select value={editedUser.cargo} onChange={(e) => handleFieldChange(e, 'cargo')}>
                                {cargos.map((cargo) => (
                                    <option key={cargo} value={cargo}>{cargo}</option>
                                ))}
                            </select>
                        ) : (
                            user.cargo
                        )}</p>
                        <p><strong>Horas:</strong> {editMode ? (
                            <input type="text" value={editedUser.horas} onChange={(e) => handleFieldChange(e, 'horas')} />
                        ) : (
                            user.horas
                        )}</p>
                    </div>
                    <h3>Tareas:</h3>
                    {user.tareasData.length ? (
                        <ul>
                            {user.tareasData.map((task) => (
                                <div key={task.id} className='border container'>
                                    <h4>{task.titulo}</h4>
                                    <p>{task.descripcion}</p>
                                    <p><strong>Estado:</strong> {task.status}</p>
                                    <p><strong>Fecha de Creación:</strong> {new Date(task.fechaCreacion).toLocaleString('es-ES', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}</p>
                                    <span> Número de tareas {task.subtasks.length}</span>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No tiene tareas asignadas.</p>
                    )}
                </div>
            </div>
            {editMode ? (
                <div className="edit-actions">
                    <button className="save-button" onClick={handleUpdateUser}>
                        <FaCheck /> Guardar
                    </button>
                    <button className="cancel-button" onClick={() => setEditMode(false)}>
                        <FaTimes /> Cancelar
                    </button>
                </div>
            ) : (
                <>
                    <button onClick={handleUpdateUser} className="update-button">Actualizar Usuario</button>
                    <button onClick={handleDeleteUser} className="delete-button">Eliminar Usuario</button>
                </>
            )}
        </div>
    );
};

export default UserDetails;
