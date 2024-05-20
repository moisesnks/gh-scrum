import React from 'react';
import useTaskDetails from './useTaskDetails';
import Spinner from '../../utils/Spinner';

import { TaskIcon } from '../../Icons';

import './TaskDetail.css';

/* 
{
  "id": "Mfz88bothavsZ4eTCb7V",
  "autorName": "Moisés Leiva",
  "autorReference": "tetBpdOlLXSsHgabow3wNTG9Xx13",
  "cargo": "back",
  "descripcion": "Se necesita implementar funcionalidad para conectarse a la API de Binance y recuperar datos en tiempo real de precios de criptomonedas.",
  "esfuerzo": 0,
  "fechaCreacion": "2024-05-08T17:33:08.489Z",
  "horas": 0,
  "incertidumbre": 0,
  "numeroTareas": 2,
  "responsables": [
    "Tgyr4FPYNzgU7wt2UTldzJ577Pn1",
    "tetBpdOlLXSsHgabow3wNTG9Xx13"
  ],
  "status": "completed",
  "subtasks": [
    {
      "label": "Configurar las credenciales necesarias para acceder a la API de Binance.",
      "completada": false
    },
    {
      "label": "Desarrollar las funciones en backend que realizarán las llamadas a la API y procesarán los datos recibidos.",
      "completada": false
    }
  ],
  "tipo": "features",
  "titulo": "API",
  "autor": {
    "id": "tetBpdOlLXSsHgabow3wNTG9Xx13",
    "displayName": "Moisés Leiva",
    "email": "mleiva@utem.cl",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/lumo-tasks.appspot.com/o/profile_images%2FuwjmXZPe9mbt6pePcg6KrRKEZ8k2?alt=media&token=b5d0da73-bf24-4943-8d1f-76e044bcf3d6"
  },
  "responsablesData": [
    {
      "id": "Tgyr4FPYNzgU7wt2UTldzJ577Pn1",
      "displayName": "Simón Carrasco",
      "email": "scarrascoi@utem.cl",
      "photoURL": "https://ui-avatars.com/api/?name=Sim%C3%B3n%20Carrasco&background=ff7675&color=fff&size=200"
    },
    {
      "id": "tetBpdOlLXSsHgabow3wNTG9Xx13",
      "displayName": "Moisés Leiva",
      "email": "mleiva@utem.cl",
      "photoURL": "https://firebasestorage.googleapis.com/v0/b/lumo-tasks.appspot.com/o/profile_images%2FuwjmXZPe9mbt6pePcg6KrRKEZ8k2?alt=media&token=b5d0da73-bf24-4943-8d1f-76e044bcf3d6"
    }
  ]
}
*/


const TaskDetail = ({ taskId }) => {
  const { task, loading, error, updateTaskDetails } = useTaskDetails(taskId);

  if (loading) {
    const text = `Buscando la tarea ${taskId}...`;
    return <Spinner text={text} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return <p>No se encontró la tarea.</p>;
  }

  const handleUpdateTask = async (formData) => {
    await updateTaskDetails(formData);
    // Lógica adicional después de la actualización si es necesaria
  };

  return (
    <div className="task-detail">
      <div className="task-header">
        <h1>{task.titulo}</h1>
        <TaskIcon isBusy={task.status} size={40} />
      </div>
      <div className="task-meta">
        <p className="task-description">{task.descripcion}</p>
        <div className="task-author"
          style={{ display: 'flex', gap: '1rem' }}
        >
          <img src={task.autor.photoURL} alt={task.autor.displayName} className="author-photo" />
          <p>{task.autor.displayName}</p>
          <p>{task.fechaCreacion}</p>
        </div>
        <p>Status: <span className={`status ${task.status}`}>{task.status}</span></p>
      </div>
      <h3>Responsables:</h3>
      <div className="responsables">
        {task.responsables.map(responsable => (
          <div key={responsable.id} className="responsable">
            <img src={responsable.photoURL} alt={responsable.displayName} className="responsable-photo" />
            <p>{responsable.displayName}</p>
          </div>
        ))}
      </div>
      <h3>Subtareas:</h3>
      <ul className="subtasks">
        {task.subtasks.map((subtask, index) => (
          <li key={index} className={subtask.completada ? 'completed' : ''}>
            {subtask.label}
          </li>
        ))}
      </ul>
      <button onClick={() => handleUpdateTask({ status: 'completed' })} className="complete-button">Marcar como Completada</button>
    </div>
  );
};

export default TaskDetail;