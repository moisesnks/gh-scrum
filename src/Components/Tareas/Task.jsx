import React from "react";
import { TaskIcon } from "../../Icons";
import "./Task.css"; // Importa el archivo CSS con las clases

const Task = ({ task, isMarkable, handleTaskSelect, onClick }) => {
    const isBusy = task.status === "Pendiente" ? true : false;

    return (
        <li className="task-container" >
            {isMarkable && (
                <input
                    type="checkbox"
                    checked={task.selected || false}
                    onChange={() => handleTaskSelect(task.id)}
                />
            )}
            <div className="task-title">
                <TaskIcon isBusy={isBusy} />
                <div className="task-body">
                    <span onClick={onClick} className="h3">{task.titulo}</span>
                    <p>{task.descripcion}</p>
                </div>
            </div>
        </li>
    );
};

export default Task;
