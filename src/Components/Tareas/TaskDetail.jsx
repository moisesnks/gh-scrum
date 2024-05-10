import React from 'react';
import useTaskDetails from './useTaskDetails';
import Spinner from '../../utils/Spinner';

const TaskDetail = ({ taskId }) => {
    const { task, loading, error, updateTaskDetails } = useTaskDetails(taskId);

    if (loading) {
        const text = `Buscando la tarea ${taskId}...`;
        return <Spinner text={text} />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!task) {
        return <p>No se encontró la tarea.</p>;
    }

    const handleUpdateTask = async (formData) => {
        await updateTaskDetails(formData);
        // Lógica adicional después de la actualización si es necesaria
    };

    return (
        <div>
            <h1>{task.titulo}</h1>
            <p>{task.descripcion}</p>
            <button onClick={() => handleUpdateTask({ status: 'completed' })}>
                Marcar como completada
            </button>
        </div>
    );
};

export default TaskDetail;
