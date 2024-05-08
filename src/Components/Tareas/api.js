// Función para añadir una tarea

// Path: src/Components/Tareas/api.js
// debe usar firestore para guardar la tarea en la colección "tasks"

import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

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

    return { error, addTask };
}

export default useTaskApi;

