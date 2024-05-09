import { useState } from 'react';
import useUserApi from './api';

const useManagementUsers = () => {
    const { error: apiError, addUser: apiAddUser, getUsers: apiGetUsers, updateUser: apiUpdateUser, getUser: apiGetUser, loading } = useUserApi();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const addUser = async ({ displayName, email, rut, photoURL = generatePhotoURL(displayName) }) => {
        try {
            const newUser = { displayName, email, rut, photoURL };
            const isSuccess = await apiAddUser(newUser);
            if (isSuccess) {
                await refreshUsers();
                return true;
            } else {
                setError('Error al agregar usuario');
                return false;
            }
        } catch (error) {
            console.error('Error adding user: ', error);
            setError('Ocurrió un error al agregar el usuario');
            return false;
        }
    };

    const generatePhotoURL = (displayName) => {
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=${randomColor()}&color=fff&size=200`;
        return avatarUrl;
    };

    const randomColor = () => {
        const colors = ['ff7675', '74b9ff', '55efc4', 'ffeaa7', 'a29bfe', '00b894', 'fd79a8', '6c5ce7'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const getUsers = async () => {
        try {
            const fetchedUsers = await apiGetUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users: ', error);
            setError('Ocurrió un error al obtener los usuarios');
        }
    };

    const updateUser = async (userId, formData) => {
        try {
            const isSuccess = await apiUpdateUser(userId, formData);
            if (isSuccess) {
                await refreshUsers();
                return true;
            } else {
                setError('Error al actualizar usuario');
                return false;
            }
        } catch (error) {
            console.error('Error updating user: ', error);
            setError('Ocurrió un error al actualizar el usuario');
            return false;
        }
    };

    const getUser = async (userId) => {
        try {
            const user = await apiGetUser(userId);
            return user;
        } catch (error) {
            console.error('Error fetching user: ', error);
            setError('Ocurrió un error al obtener el usuario');
            return null;
        }
    };

    const refreshUsers = async () => {
        await getUsers();
    };

    return { users, error, addUser, getUsers, updateUser, getUser, loading };
};

export default useManagementUsers;
