// path: src/Components/Tareas/api.js
import { useState } from 'react';

const apiUrl = 'https://backend-lumotareas.vercel.app/tasks';

const useTaskApi = () => {
    const [error, setError] = useState(null);

    const addTask = async (task) => {
        try {
            const response = await fetch(apiUrl + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Error al añadir la tarea');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const getTasks = async () => {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Error al obtener las tareas');
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    const getTask = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`);

            if (!response.ok) {
                throw new Error('Error al obtener la tarea');
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    const updateTaskStatus = async (id, status) => {
        try {
            const response = await fetch(`${apiUrl}/${id}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: status }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado de la tarea');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}/delete`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const updateTask = async (id, task) => {
        try {
            const response = await fetch(`${apiUrl}/${id}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la tarea');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const asignarResponsables = async (id, responsables) => {
        try {
            const response = await fetch(`${apiUrl}/${id}/asignar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responsables }),
            });

            if (!response.ok) {
                throw new Error('Error al asignar responsables');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const desasignarResponsables = async (id, responsables) => {
        try {
            const response = await fetch(`${apiUrl}/${id}/desasignar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responsables }),
            });

            if (!response.ok) {
                throw new Error('Error al desasignar responsables');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        error,
        addTask,
        getTasks,
        getTask,
        updateTaskStatus,
        asignarResponsables,
        desasignarResponsables,
        deleteTask,
        updateTask,
    };
};

export default useTaskApi;
