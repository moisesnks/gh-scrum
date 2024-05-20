// path: src/Components/Usuarios/api.js

import { useState } from 'react';
const apiUrl = 'https://backend-lumotareas.vercel.app/users';
const useUserApi = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const generatePasswordFromEmailAndRut = (email, rut) => {
        const emailPrefix = email.split('@')[0]; // Obtiene la parte antes del '@' del correo
        const rutDigits = rut.replace('-', '').slice(-3); // Obtiene los últimos 3 dígitos del RUT sin guion

        // Combina partes del correo y del RUT para crear una contraseña
        const password = `${emailPrefix}${rutDigits}`;

        return password;
    };

    const addUser = async (user) => {
        try {
            setLoading(true);

            const password = generatePasswordFromEmailAndRut(user.email, user.rut);
            const tareasReference = [];
            const response = await fetch(apiUrl + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...user, password, tareasReference }),
            });

            if (!response.ok) {
                throw new Error('Error al añadir el usuario');
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

            const response = await fetch(apiUrl);

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

            const response = await fetch(`${apiUrl}/${id}`);

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

            const response = await fetch(`${apiUrl}/${id}/update`, {
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
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const deleteUserById = async (id) => {
        try {
            setLoading(true);

            const response = await fetch(`${apiUrl}/${id}/delete`, {
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