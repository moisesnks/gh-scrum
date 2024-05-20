import React from "react";
import { TaskIcon } from "../../Icons";
import "./Task.css";



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
  "autorData": {
    "id": "tetBpdOlLXSsHgabow3wNTG9Xx13",
    "displayName": "Moisés Leiva",
    "email": "mleiva@utem.cl",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/lumo-tasks.appspot.com/o/profile_images%2FuwjmXZPe9mbt6pePcg6KrRKEZ8k2?alt=media&token=b5d0da73-bf24-4943-8d1f-76e044bcf3d6"
  },
  "responsables": [
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


export const Responsible = ({ responsable }) => {
    return (
        <div className="responsible">
            <img src={responsable.photoURL} alt={responsable.displayName} />
            <span>{responsable.displayName}</span>
        </div>
    );
};

export const Subtask = ({ subtask }) => {
    return (
        <div className="subtask">
            <input type="checkbox" checked={subtask.completada} readOnly />
            <label>{subtask.label}</label>
        </div>
    );
};

export const AuthorInfo = ({ autorData }) => {
    return (
        <div className="author-info">
            <img src={autorData.photoURL} alt={autorData.displayName} />
            <span>{autorData.displayName}</span>
            <span>{autorData.email}</span>
        </div>
    );
};


const Task = ({ task, isMarkable, handleTaskSelect, onClick }) => {
    const isBusy = task.status || '';

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
                <div className="task-body">
                    <span onClick={onClick} className="h3">
                        <TaskIcon isBusy={isBusy} />
                        {task.titulo}
                    </span>
                    <p>{task.descripcion}</p>
                    <div className="task-footer">
                        <div className="task-responsibles">
                            {task.responsables.map((responsable) => (
                                <Responsible key={responsable.id} responsable={responsable} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Task;
