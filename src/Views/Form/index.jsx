import React, { useState } from 'react';
import FormTask from '../../Form/Form.jsx';
import TaskPreview from '../../Form/Preview.jsx';

const Form = () => {
    // Initial task object
    const [initialTask, setSubmittedTask] = useState({
        tag: 'bug',
        title: 'Fix the bug',
        description: 'The app is crashing when the user clicks the button.',
        tasks: [
            {
                label: 'Task 1',
                description: 'Find the error in the code.',
            },
            {
                label: 'Task 2',
                description: 'Fix the error.',
            },
        ],
        observations: 'The error is in the file App.js',
        dueDate: '2021-12-31',
    });


    // Handle task state updates
    const handleUpdateTask = (updatedTask) => {
        setSubmittedTask(updatedTask);
    };

    return (
        <div className="container">
            <div className="flex-container">
                <div className="flex-item">
                    <div className="section">
                        <div className="section-header">
                            <h2>Task Form</h2>
                        </div>
                        <FormTask submittedTask={initialTask} onUpdate={handleUpdateTask} />
                    </div>
                </div>
                <div className="flex-item">
                    <div className="section">
                        <div className="section-header">
                            <h2>Preview</h2>
                        </div>
                        <TaskPreview submittedTask={initialTask} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
