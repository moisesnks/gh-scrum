// TaskForm.jsx

import React from 'react';
import useTaskForm from './useTaskForm';
import './TaskForm.css'; // Importa el archivo CSS con las clases

export const options = [
    { value: 'front', label: 'Frontend' },
    { value: 'back', label: 'Backend' },
    { value: 'qa', label: 'QA' },
    { value: 'devops', label: 'DevOps' },
    { value: 'infra', label: 'Infraestructura' },
    { value: 'design', label: 'Diseño' },
    { value: 'sec', label: 'Seguridad' },
    { value: 'pm', label: 'Project Manager' },
    { value: 'scrum', label: 'Scrum Master' },
    { value: 'seclead', label: 'Líder de Seguridad' },
    { value: 'tl', label: 'Líder Técnico' },
    { value: 'infralead', label: 'Líder de Infraestructura' },
    { value: 'other', label: 'Otro' },
];

const TaskForm = () => {
    const { error, formData, handleInputChange, handleAddSubtask, handleDeleteSubtask, handleSubmit, handleSubtaskChange } = useTaskForm();



    return (
        <div className="container-task-form">
            <h2>Crear tarea</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} />
                </label>
                <label>
                    Descripción:
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                </label>
                <label>
                    Autor:
                    <input type="text" name="autorName" value={formData.autorName} readOnly />
                </label>
                <label>
                    Tipo:
                    <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                        <option value="features">Feature</option>
                        <option value="docs">Spike</option>
                        <option value="bugs">Bug</option>
                    </select>
                </label>
                <label>
                    Cargo:
                    <select name="cargo" value={formData.cargo} onChange={handleInputChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Número de Tareas:
                    <input type="number" name="numeroTareas" value={formData.subtasks.length} readOnly />
                </label>

                {/* Renderizar las subtareas */}
                {formData.subtasks.map((subtask, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={subtask.label}
                            onChange={(e) => handleSubtaskChange(index, 'label', e.target.value)}
                        />
                        <button type="button" onClick={() => handleDeleteSubtask(index)}>
                            &times;
                        </button>
                    </div>
                ))}

                {/* Botón para agregar subtarea */}
                <button type="button" onClick={handleAddSubtask}>
                    Agregar Subtarea
                </button>

                <button type="submit">Crear Tarea</button>
            </form>
        </div>
    );
};

export default TaskForm;
