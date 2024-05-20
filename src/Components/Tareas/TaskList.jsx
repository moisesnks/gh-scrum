// TaskList.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskIcon } from "../../Icons";
import Spinner from "../../utils/Spinner";
import "./TaskList.css"; // Importa el archivo CSS con las clases

import useTaskList from "./useTaskList";
import Task from "./Task";

const TaskList = () => {
    const navigate = useNavigate();
    const {
        tasks,
        filteredTasks,
        error,
        loading,
        selectAll,
        selectedTasks,
        active,
        filterTasks,
        handleSelectAll,
        handleTaskSelect,
        handleChangeStatus,
        handleDeleteTasks,
    } = useTaskList();

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
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                {selectedTasks.length > 0 ? (
                    <div>
                        <span>{`${selectedTasks.length} tareas seleccionadas.`}</span>
                        <select onChange={(e) => handleChangeStatus(e.target.value)}>
                            <option>Marcar como</option>
                            <option value="pending">Pendientes</option>
                            <option value="inprogress">En progreso</option>
                            <option value="completed">Completadas</option>
                        </select>
                        <button onClick={handleDeleteTasks}>Eliminar</button>
                    </div>
                ) : (
                    <>
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
                        {/*  In progress: */}
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
                        {/* Total */}
                        <span
                            className={`task-count ${active === "all" ? "active" : ""}`}
                            onClick={() => filterTasks("all")}
                        >
                            <span> 📝 </span>
                            {numTasks.total} Total
                        </span>

                    </>
                )}
            </div>
            {filteredTasks.length > 0 ? (
                <ul className="task-list-container">
                    {filteredTasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            isMarkable={true}
                            handleTaskSelect={handleTaskSelect}
                            onClick={() => handleClick(task)}
                        />
                    ))}
                </ul>
            ) : (
                <div className="notask-container">
                    {/* No hay tareas en {status} */}
                    <p>No hay tareas en {active}.</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
