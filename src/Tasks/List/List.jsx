import React, { useState } from 'react';
import Task from '../Task/Task';
import useTaskAssignments from '../TaskAssignments';
import './List.css';

import Filtro from '../../utils/Filtro/Filtro';

const ListTasks = ({ tasks, avatars, updateAvatarScore }) => {
    const [filtro, setFiltro] = useState("todas");

    const filtrar = (filtro) => {
        setFiltro(filtro);
    };

    const { updatedTasks, assignAvatarToTask, removeAvatarFromTask } = useTaskAssignments(tasks);

    const handleDrop = (taskId, avatarId) => {
        console.log('Handling drop - Task ID:', taskId, 'Avatar ID:', avatarId);

        const task = updatedTasks.find((task) => task.id === taskId);
        const avatar = avatars.find((avatar) => avatar.id === avatarId);

        if (!task || !avatar) return;

        if (!task.assignedAvatars.includes(avatarId)) {
            assignAvatarToTask(taskId, avatarId);
            updateAvatarScore(avatarId, task.project_info.Estimate);
        } else {
            console.log(`Avatar ${avatarId} already assigned to Task ${taskId}. No action needed.`);
        }
    };

    const handleRemoveAvatar = (taskId, avatarId) => {
        console.log('Removing avatar:', avatarId, 'from task:', taskId);
        removeAvatarFromTask(taskId, avatarId);

        const task = updatedTasks.find((task) => task.id === taskId);
        if (task) {
            const scoreToRemove = task.project_info.Estimate;
            updateAvatarScore(avatarId, -scoreToRemove);
        }
    };

    // Aplicar el filtro directamente en el mapeo de las tareas
    const tasksToDisplay = updatedTasks.filter((task) => {
        if (filtro === "ocupadas") {
            return task.isBusy;
        } else if (filtro === "libres") {
            return !task.isBusy;
        }
        return true; // "todas" o filtro no definido
    });

    return (
        <div className="task-list-container">
            <Filtro onFiltrar={filtrar} />
            {tasksToDisplay.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    avatars={avatars}
                    handleDrop={handleDrop}
                    handleRemoveAvatar={handleRemoveAvatar}
                />
            ))}
        </div>
    );
};

export default ListTasks;
