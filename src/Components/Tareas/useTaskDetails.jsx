import { useState, useEffect } from 'react';
import useTaskApi from './api';

const useTaskDetails = (taskId) => {
    const { getTask, updateTask } = useTaskApi(); // Utiliza el hook de la API

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const fetchedTask = await getTask(taskId);
                setTask(fetchedTask);
            } catch (error) {
                setError(error.message || 'Error al obtener la tarea.');
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            fetchTask();
        }

        return () => {
            // Cleanup function if needed
        };
    }, [taskId]);

    const updateTaskDetails = async (formData) => {
        try {
            await updateTask(taskId, formData);
            // Actualización exitosa, refrescar la tarea
            const updatedTask = await getTask(taskId);
            setTask(updatedTask);
        } catch (error) {
            setError(error.message || 'Error al actualizar la tarea.');
        }
    };

    return { task, loading, error, updateTaskDetails };
};

export default useTaskDetails;
