import React from 'react';
import useTaskForm from './useTaskForm';
import styled from 'styled-components';

// Estilos para el contenedor principal
const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 10px;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 5px;
    }

    button {
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        margin-top: 10px;
        background-color: #007bff;
        color: white;
    }

    button[type='submit'] {
        background-color: #28a745;
    }

    button[type='button'] {
        background-color: #dc3545;
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }
`;

const TaskForm = () => {
    const { error, formData, handleInputChange, handleAddSubtask, handleDeleteSubtask, handleSubmit, handleSubtaskChange } = useTaskForm();

    return (
        <Container>
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
                        <option value="front">Frontend</option>
                        <option value="back">Backend</option>
                        <option value="qa">QA</option>
                        <option value="devops">DevOps</option>
                        <option value="infra">Infraestructura</option>
                        <option value="design">Diseño</option>
                        <option value="sec">Seguridad</option>
                        <option value="pm">Project Manager</option>
                        <option value="other">Otro</option>
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
        </Container>
    );
};

export default TaskForm;
