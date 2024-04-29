import React, { useState, useEffect } from 'react';
import './Form.css';

function FormTask({ submittedTask, onUpdate }) {
    const [task, setTask] = useState(submittedTask);

    useEffect(() => {
        setTask(submittedTask);
    }, [submittedTask]);

    const handleChange = (key, value) => {
        setTask({
            ...task,
            [key]: value
        });
        onUpdate({ ...task, [key]: value }); // Actualiza el estado en App.jsx
    };

    const handleAddTask = () => {
        const newTask = { label: 'Tarea nueva', description: 'Descripción nueva' };
        setTask({
            ...task,
            tasks: [...task.tasks, newTask]
        });
        onUpdate({ ...task, tasks: [...task.tasks, newTask] }); // Actualiza el estado en App.jsx
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = task.tasks.filter((task, i) => i !== index);
        setTask({
            ...task,
            tasks: updatedTasks
        });
        onUpdate({ ...task, tasks: updatedTasks }); // Actualiza el estado en App.jsx
    };

    const handleTaskChange = (index, key, value) => {
        const updatedTasks = [...task.tasks];
        updatedTasks[index][key] = value;
        setTask({
            ...task,
            tasks: updatedTasks
        });
        onUpdate({ ...task, tasks: updatedTasks }); // Actualiza el estado en App.jsx
    };

    return (
        <div className="task-container">
            <label htmlFor="tag">Etiqueta:</label>
            <select id="tag" value={task.tag} onChange={(e) => handleChange('tag', e.target.value)}>
                <option value="feature">Feature</option>
                <option value="spike">Spike</option>
                <option value="bug">Bug</option>
            </select>

            <label htmlFor="title">Título:</label>
            <input type="text" id="title" value={task.title} onChange={(e) => handleChange('title', e.target.value)} />

            <label htmlFor="description">Descripción:</label>
            <textarea id="description" rows="6" value={task.description} onChange={(e) => handleChange('description', e.target.value)}></textarea>

            <label htmlFor="observations">Observaciones:</label>
            <textarea id="observations" rows="3" value={task.observations} onChange={(e) => handleChange('observations', e.target.value)}></textarea>

            <label htmlFor="dueDate">Fecha de Vencimiento:</label>
            <input type="date" id="dueDate" value={task.dueDate} onChange={(e) => handleChange('dueDate', e.target.value)} />


            <div className="tasks-container">
                <span>
                    <h3>Tareas:</h3>
                    <button type="button" onClick={handleAddTask}>Agregar Tarea</button>
                </span>
                <div className="tasks">
                    {task.tasks.map((task, index) => (
                        <div className="task" key={index}>
                            <input type="text" value={task.label} onChange={(e) => handleTaskChange(index, 'label', e.target.value)} />
                            <textarea value={task.description} onChange={(e) => handleTaskChange(index, 'description', e.target.value)}></textarea>
                            <button className="delete-task" type="button" onClick={() => handleDeleteTask(index)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FormTask;