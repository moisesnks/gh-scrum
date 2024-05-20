import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.addTask(formData);
            setFormData({
                titulo: '',
                descripcion: '',
                autorReference: uid,
                autorName: displayName,
                tipo: 'features',
                cargo: 'front',
                numeroTareas: 0,
                esfuerzo: 0,
                incertidumbre: 0,
                horas: 0,
                status: 'pending',
                subtasks: [],
                responsables: [],
            });
        } catch (error) {
            setError(error.message);
        }
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
