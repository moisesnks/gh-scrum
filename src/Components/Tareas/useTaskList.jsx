import { useState, useEffect } from 'react';
import Api from './api';

const useTaskList = () => {
    const api = Api();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [active, setActive] = useState('pending');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await api.getTasks();
                setTasks(tasks);
                setFilteredTasks(tasks);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const filterTasks = (status) => {
        if (status === 'all') {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((task) => task.status === status);
            setFilteredTasks(filtered);
            setActive(status);
        }
        setSelectAll(false);
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        const updatedTasks = filteredTasks.map((task) => ({ ...task, selected: checked }));
        setFilteredTasks(updatedTasks);
        setSelectAll(checked);
    };

    const handleTaskSelect = (taskId) => {
        const updatedTasks = filteredTasks.map((task) =>
            task.id === taskId ? { ...task, selected: !task.selected } : task
        );
        setFilteredTasks(updatedTasks);
        setSelectAll(updatedTasks.every((task) => task.selected));
    };

    const selectedTasks = filteredTasks.filter((task) => task.selected);

    const handleChangeStatus = async (status) => {
        const confirmChange = window.confirm('¿Estás seguro de querer cambiar el estado de las tareas seleccionadas?');

        if (!confirmChange) {
            return;
        }

        try {
            setLoading(true);

            const updatePromises = selectedTasks.map(async (task) => {
                return await api.updateTaskStatus(task.id, status);
            });

            const responses = await Promise.all(updatePromises);
            setLoading(false);

            const allUpdatedSuccessfully = responses.every((response) => response === true);

            if (allUpdatedSuccessfully) {
                const updatedTasks = tasks.map((task) =>
                    selectedTasks.some((selectedTask) => selectedTask.id === task.id)
                        ? { ...task, status }
                        : task
                );

                setTasks(updatedTasks);
                setFilteredTasks(updatedTasks);
                setSelectAll(false);
            } else {
                console.log('Alguna tarea no se pudo actualizar correctamente');
            }
        } catch (error) {
            console.error('Error al actualizar el estado de las tareas:', error);
        }
    };

    const numTasks = {
        pending: tasks.filter((task) => task.status === 'Pendiente').length,
        completed: tasks.filter((task) => task.status === 'Completada').length,
        total: tasks.length,
    }

    return {
        tasks,
        selectedTasks,
        filteredTasks,
        error,
        loading,
        selectAll,
        active,
        numTasks,
        filterTasks,
        handleSelectAll,
        handleTaskSelect,
        handleChangeStatus,
    };
};

export default useTaskList;
