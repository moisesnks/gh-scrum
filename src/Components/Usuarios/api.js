// path: src/Components/Usuarios/api.js

import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
const apiUrl = 'https://backend-lumotareas.vercel.app/users';


const useUserApi = () => {
    const { token } = useAuth();

    const fetchWithAuthorization = async (url, options = {}) => {
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };

        return fetch(url, { ...options, headers });
    };

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const addUser = async (data) => {
        try {
            setLoading(true);

            const response = await fetchWithAuthorization(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const getUsers = async () => {
        try {
            setLoading(true);

            const response = await fetchWithAuthorization(apiUrl);

            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }

            const users = await response.json();

            setLoading(false);

            return users;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const getUser = async (id) => {
        try {
            setLoading(true);

            const response = await fetchWithAuthorization(`${apiUrl}/${id}`);


            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }

            const user = await response.json();

            setLoading(false);

            return user;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const updateUser = async (id, user) => {
        try {
            setLoading(true);

            const response = await fetchWithAuthorization(`${apiUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            setLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };

    const deleteUserById = async (id) => {
        try {
            setLoading(true);

            const response = await fetchWithAuthorization(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


    return { error, addUser, getUsers, updateUser, getUser, loading, deleteUserById };
};

export default useUserApi;