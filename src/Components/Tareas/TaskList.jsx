import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskIcon } from "../../Icons";
import Spinner from "../../utils/Spinner";
import "./TaskList.css"; // Importa el archivo CSS con las clases

import useTaskList from "./useTaskList";
import Task from "./Task";

const TaskList = ({ asignadas = false }) => {
    const navigate = useNavigate();
    const {
        tasks,
        filteredTasks,
        error,
        loading,
        active,
        filterTasks,
    } = useTaskList(asignadas);

    const handleClick = (task) => {
        navigate(`/home/task/${task.id}`);
    };

    if (loading) {
        return <Spinner text={"Cargando tareas..."} />;
    }

    const numTasks = tasks.reduce(
        (acc, task) => {
            if (task.status === "pending") {
                acc.pending++;
            } else if (task.status === "inprogress") {
                acc.inprogress++;
            } else {
                acc.completed++;
            }
            acc.total++;
            return acc;
        },
        { pending: 0, inprogress: 0, completed: 0, total: 0 }
    );

    return (
        <div className="container-task-list">
            {error && <p>{error}</p>}
            <div className="task-header">
                <span
                    className={`task-count ${active === "pending" ? "active" : ""}`}
                    onClick={() => filterTasks("pending")}
                >
                    <TaskIcon
                        isBusy={active && active === "pending" ? "pending" : ""}
                        size={"1.2rem"}
                    />
                    {numTasks.pending} Pendientes
                </span>
                <span
                    className={`task-count ${active === "inprogress" ? "active" : ""}`}
                    onClick={() => filterTasks("inprogress")}
                >
                    <TaskIcon
                        isBusy={active && active === "inprogress" ? "inprogress" : ""}
                        size={"1.2rem"}
                    />
                    {numTasks.inprogress} En progreso
                </span>
                <span
                    className={`task-count ${active === "completed" ? "active" : ""}`}
                    onClick={() => filterTasks("completed")}
                >
                    <TaskIcon isBusy={active && active === "completed" ? "completed" : ""} size={"1.2rem"} />
                    {numTasks.completed} Completadas
                </span>
                <span
                    className={`task-count ${active === "all" ? "active" : ""}`}
                    onClick={() => filterTasks("all")}
                >
                    <span> 📝 </span>
                    {numTasks.total} Total
                </span>
            </div>
            {filteredTasks.length > 0 ? (
                <ul className="task-list-container">
                    {filteredTasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            isMarkable={false}
                            onClick={() => handleClick(task)}
                        />
                    ))}
                </ul>
            ) : (
                <div className="notask-container">
                    <p>No hay tareas en {active}.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
