// home/task/:id

// Path: src/Views/Task/index.jsx

import React from 'react';
import TaskDetail from '../../Components/Tareas/TaskDetail';

const TaskPage = () => {
    // Get the task id from the URL
    const taskId = window.location.pathname.split('/').pop();
    return (
        <div className='container'>
            <TaskDetail taskId={taskId} />
        </div>
    );
}

export default TaskPage;