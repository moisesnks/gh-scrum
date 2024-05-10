import React, { useEffect, useState } from 'react';
import useManagementUsers from './useManagementUsers';
import UserCard from './UserCard';
import AddUserModal from './AddUserModal';
import Spinner from '../../utils/Spinner';
import './ManagementUsers.css';

const ManagementUsers = () => {
    const {
        users,
        error,
        loading,
        addUser,
        getUsers,
        updateUser,
        deleteUser
    } = useManagementUsers();

    useEffect(() => {
        getUsers();
    }, []); // Se ejecuta solo al montar el componente

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const handleDeleteSelectedUsers = async () => {
        const promises = selectedUsers.map(userId => deleteUser(userId));
        const results = await Promise.all(promises);

        const isSuccess = results.every(success => success);
        if (!isSuccess) {
            console.error('Error al eliminar usuario(s)');
        }

        setSelectedUsers([]);
    };

    const handleAddUser = async (userData) => {
        const success = await addUser(userData);
        if (success) {
            setShowAddUserModal(false);
        } else {
            console.error('Error al agregar usuario');
        }
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

    return (
        <div className="management-users-container">
            <div className="management-buttons">
                <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAllUsers}
                />
                <AddUserModal
                    onClose={() => setShowAddUserModal(false)}
                    addUser={handleAddUser}
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



            {loading && <Spinner text="Cargando usuarios..." />}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ManagementUsers;
