import React, { useEffect } from 'react';
import useManagementUsers from './useManagementUsers';
import UserCard from './UserCard';
import AddUserModal from './addUserModal';
import Spinner from '../../utils/Spinner';

const ManagementUsers = () => {
    const { users, error, loading, addUser, getUsers, updateUser } = useManagementUsers();

    useEffect(() => {
        getUsers();
    }, []);

    const handleAddUser = async (userData) => {
        const success = await addUser(userData);
        if (!success) {
        }
    };

    const handleUpdateUser = async (userId, updatedData) => {
        const success = await updateUser(userId, updatedData);
        if (!success) {
        }
    };

    if (loading) {
        const text = `Cargando usuarios...`;
        return <Spinner text={text} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onUpdate={handleUpdateUser}
                />
            ))}
            < AddUserModal addUser={handleAddUser} />
        </div>
    );
};

export default ManagementUsers;