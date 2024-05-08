import React, { useState, useEffect } from "react";
import { TaskIcon } from "../../Icons";
import styled from "styled-components";

import Api from "./api";
import Task from "./Task";

const Container = styled.div`
    font-family: Arial, sans-serif;
    margin: 20px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 20px 10px;
`;

const TaskHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: skyblue;
    margin: -20px -10px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px 5px 0 0;
`;

const TaskCount = styled.span`
    margin-right: 10px;
    cursor: pointer;
`;

const TaskListContainer = styled.ul`
    list-style: none;
    padding: 0;
`;

const TaskList = () => {
    const api = Api();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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
        if (status === "all") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter((task) => task.status === status);
            setFilteredTasks(filtered);
        }
        setSelectAll(false); // Desactivar selección al cambiar el filtro
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

    const numTasks = {
        total: tasks.length,
        pending: tasks.filter((task) => task.status === "pending").length,
        completed: tasks.filter((task) => task.status === "completed").length,
    };

    const handleChangeStatus = async (status) => {
        // Primero pide una confirmación antes de cambiar el estado de las tareas
        const confirmChange = window.confirm(`¿Estás seguro de querer cambiar el estado de las tareas seleccionadas?`);

        if (!confirmChange) {
            return;
        }

        try {
            setLoading(true);
            // Array para almacenar las promesas de actualización de estado
            const updatePromises = selectedTasks.map(async (task) => {
                return await api.updateTaskStatus(task.id, status);
            });

            // Esperar a que todas las promesas se resuelvan
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
                console.log("Alguna tarea no se pudo actualizar correctamente");
            }
        } catch (error) {
            console.error("Error al actualizar el estado de las tareas:", error);
        }
    };



    if (loading) {
        return <p>Cargando tareas...</p>;
    }

    return (
        <Container>
            {error && <p>{error}</p>}
            <TaskHeader>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                {selectedTasks.length > 0 ? (
                    <div>
                        <span>{`${selectedTasks.length} tareas seleccionadas.`}</span>
                        <select onChange={(e) => handleChangeStatus(e.target.value)}>
                            <option>Marcar como</option>
                            <option value="pending">Pendientes</option>
                            <option value="completed">Completadas</option>
                        </select>
                    </div>
                ) : (
                    <>
                        <TaskIcon forceColor="#333" />
                        <TaskCount onClick={() => filterTasks("pending")}>{numTasks.pending} pendientes.</TaskCount>
                        <TaskCount onClick={() => filterTasks("completed")}>{numTasks.completed} completadas.</TaskCount>
                        <TaskCount onClick={() => filterTasks("all")}>{numTasks.total} tareas en total.</TaskCount>
                    </>
                )}

            </TaskHeader>
            <TaskListContainer>
                {filteredTasks.map((task) => (
                    <React.Fragment key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.selected || false}
                            onChange={() => handleTaskSelect(task.id)}
                        />
                        <Task task={task} />
                    </React.Fragment>
                ))}
            </TaskListContainer>
        </Container>
    );
};

export default TaskList;
