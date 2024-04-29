import { useState } from 'react';

const useTaskAssignments = (tasks) => {
    const [updatedTasks, setUpdatedTasks] = useState(tasks);

    const assignAvatarToTask = (taskId, avatarId) => {
        const updated = updatedTasks.map((task) => {
            if (task.id === taskId) {
                const newAssignedAvatars = [...task.assignedAvatars, avatarId];
                return {
                    ...task,
                    assignedAvatars: newAssignedAvatars,
                    isBusy: newAssignedAvatars.length > 0,
                };
            }
            return task;
        });
        setUpdatedTasks(updated);
    };

    const removeAvatarFromTask = (taskId, avatarId) => {
        const updated = updatedTasks.map((task) => {
            if (task.id === taskId) {
                const newAssignedAvatars = task.assignedAvatars.filter((id) => id !== avatarId);
                return {
                    ...task,
                    assignedAvatars: newAssignedAvatars,
                    isBusy: newAssignedAvatars.length > 0,
                };
            }
            return task;
        });
        setUpdatedTasks(updated);
    };

    return { updatedTasks, assignAvatarToTask, removeAvatarFromTask };
};

export default useTaskAssignments;
