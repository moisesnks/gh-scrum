import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import TaskModel from './TaskModel';
import Api from './api';

const useTaskForm = () => {
    const { user } = useAuth();
    const { displayName, uid } = user;
    const [error, setError] = useState(null);
    const api = Api();

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        autorReference: uid,
        autorName: displayName,
        fechaCreacion: new Date(),
        tipo: 'features',
        cargo: 'front',
        numeroTareas: 0, // Mantén un contador de número de tareas
        esfuerzo: 0,
        incertidumbre: 0,
        horas: 0,
        status: 'pending',
        subtasks: [], // Arreglo para almacenar subtareas
        responsables: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddSubtask = () => {
        const updatedSubtasks = [...formData.subtasks, { label: '', completada: false }];
        setFormData((prevData) => ({
            ...prevData,
            subtasks: updatedSubtasks,
            numeroTareas: updatedSubtasks.length, // Actualiza numeroTareas al agregar una subtarea
        }));
    };

    const handleSubtaskChange = (index, field, value) => {
        const updatedSubtasks = [...formData.subtasks];
        updatedSubtasks[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            subtasks: updatedSubtasks,
        }));
    };

    const handleDeleteSubtask = (index) => {
        const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            subtasks: updatedSubtasks,
            numeroTareas: updatedSubtasks.length, // Actualiza numeroTareas al eliminar una subtarea
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar los campos requeridos antes de crear la tarea
        if (!formData.titulo.trim()) {
            setError('Por favor, ingresa un título para la tarea.');
            return;
        }

        if (!formData.descripcion.trim()) {
            setError('Por favor, ingresa una descripción para la tarea.');
            return;
        }

        if (!formData.subtasks.length) {
            setError('Por favor, agrega al menos una subtarea.');
            return;
        }

        if (formData.subtasks.some((subtask) => !subtask.label.trim())) {
            setError('Por favor, asegúrate de completar todas las etiquetas de las subtareas.');
            return;
        }

        // Si se superan todas las validaciones, crear la tarea
        const newTask = new TaskModel(formData);
        api.addTask(newTask.toFirestore());
    };

    return {
        formData,
        error,
        handleInputChange,
        handleAddSubtask,
        handleSubtaskChange,
        handleSubmit,
        handleDeleteSubtask,
    };
};

export default useTaskForm;
