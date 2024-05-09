// path: src/Components/Tareas/api.js
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import TaskModel from './TaskModel';

const useTaskApi = () => {
    const [error, setError] = useState(null);

    const addTask = async (task) => {
        try {
            const docRef = await addDoc(collection(db, 'tasks'), task);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
            setError('Ocurrió un error al crear la tarea');
        }
    };

    const getTasks = async () => {
        try {
            const taskCollection = collection(db, 'tasks');
            const querySnapshot = await getDocs(taskCollection);
            const tasks = [];

            querySnapshot.forEach((doc) => {
                const taskModel = TaskModel.fromFirestore(doc);
                tasks.push(taskModel);
            });

            return tasks;
        } catch (error) {
            console.error('Error fetching tasks: ', error);
            setError('Ocurrió un error al obtener las tareas');
            return [];
        }
    };

    const updateTaskStatus = async (taskId, status) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            const taskDoc = await getDoc(taskRef);

            if (!taskDoc.exists()) {
                setError('La tarea no existe');
                return false; // Devolver false si la tarea no existe
            }

            // Actualizar el estado de la tarea
            await updateDoc(taskRef, { status });

            // Verificar si la actualización se realizó correctamente
            const updatedTaskDoc = await getDoc(taskRef);
            const updatedStatus = updatedTaskDoc.data().status;

            if (updatedStatus === status) {
                return true; // Devolver true si el estado se actualizó correctamente
            } else {
                setError('Error: No se pudo actualizar el estado de la tarea');
                return false; // Devolver false si no se pudo actualizar el estado
            }
        } catch (e) {
            console.error('Error updating document: ', e);
            setError('Ocurrió un error al actualizar el estado de la tarea');
            return false; // Devolver false en caso de error
        }
    };

    const getTask = async (taskId) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            const taskDoc = await getDoc(taskRef);

            if (!taskDoc.exists()) {
                setError('La tarea no existe');
                return null; // Devolver null si la tarea no existe
            }

            const taskModel = TaskModel.fromFirestore(taskDoc);
            return taskModel;
        } catch (e) {
            console.error('Error getting document: ', e);
            setError('Ocurrió un error al obtener la tarea');
            return null; // Devolver null en caso de error
        }
    };


    const deleteTask = async (taskId) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, { deleted: true });
        } catch (e) {
            console.error('Error deleting document: ', e);
            setError('Ocurrió un error al eliminar la tarea');
        }
    }

    const updateTask = async (taskId, formData) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, formData);
        } catch (e) {
            console.error('Error updating document: ', e);
            setError('Ocurrió un error al actualizar la tarea');
        }
    };
    return {
        error,
        addTask,
        getTasks,
        getTask,
        updateTaskStatus,
        deleteTask,
        updateTask,
    };
};

export default useTaskApi;
