import React, { useEffect, useState } from 'react';
import useManagementUsers from './useManagementUsers';
import UserCard from './UserCard';
import Spinner from '../../utils/Spinner';
import './ManagementUsers.css';

const ManagementUsers = () => {
    const {
        users,
        error,
        loading,
        getUsers,
        updateUser,
        deleteUser
    } = useManagementUsers();

    useEffect(() => {
        getUsers();
    }, []);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleDeleteSelectedUsers = async () => {
        const promises = selectedUsers.map(userId => deleteUser(userId));
        const results = await Promise.all(promises);

        const isSuccess = results.every(success => success);
        if (!isSuccess) {
            console.error('Error al eliminar usuario(s)');
        }

        setSelectedUsers([]);
    };

    const handleSelectAllUsers = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            const allUserIds = users.map(user => user.id);
            setSelectedUsers(allUserIds);
        }
    };

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    if (loading) {
        return <Spinner text="Cargando usuarios..." />
    }

    if (error) {
        return (
            <div className="error-message">
                {error}
            </div>
        )
    }

    return (
        <div className="management-users-container">
            <div className="management-buttons">
                <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAllUsers}
                />
                <button
                    className="delete-selected-button"
                    disabled={selectedUsers.length === 0}
                    onClick={handleDeleteSelectedUsers}
                >
                    Eliminar Seleccionados
                </button>
            </div>

            <div className="user-cards-container">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        updateUser={updateUser}
                        isEditable={true}
                        isSelected={selectedUsers.includes(user.id)}
                        onSelect={() => handleUserSelect(user.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManagementUsers;
