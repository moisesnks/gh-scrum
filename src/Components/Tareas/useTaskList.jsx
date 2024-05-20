import { useState, useEffect } from 'react';
import Api from './api';

const useTaskList = () => {
    const api = Api();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [active, setActive] = useState('all');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
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
            setActive(status);
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
        setLoading(true);
        try {
            await Promise.all(selectedTasks.map((task) => api.updateTaskStatus(task.id, status)));
            const updatedTasks = tasks.map((task) => {
                if (selectedTasks.find((selected) => selected.id === task.id)) {
                    return { ...task, status };
                }

                return task;
            });
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            setLoading(false);
        }
        catch (error) {
            setError(error);
            setLoading(false);

        }
    }

    const handleDeleteTasks = async () => {
        setLoading(true);
        try {
            await Promise.all(selectedTasks.map((task) => api.deleteTask(task.id)));
            const updatedTasks = tasks.filter((task) => !selectedTasks.find((selected) => selected.id === task.id));
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

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
        handleDeleteTasks,
    };
};

export default useTaskList;
