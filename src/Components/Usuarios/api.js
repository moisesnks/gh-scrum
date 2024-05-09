// path: src/Components/Usuarios/api.js

import { db, auth } from '../../firebaseConfig';
import { collection, getDocs, addDoc, getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import UserModel from './UserModel';

const useUserApi = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addUser = async (user) => {
        const { email, rut } = user;
        const rutSinGuion = rut.replace('-', '').split('')[0];
        const emailSinArroba = email.split('@')[0];
        const ultimosDigitos = rutSinGuion.slice(-3);
        const password = emailSinArroba + ultimosDigitos;
        console.log('password', password);

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDoc = userCredential.user;

            if (!userDoc) {
                setLoading(false);
                setError('Error al crear el usuario');
                return false;
            }

            const userCollection = collection(db, 'users');
            const userRef = doc(userCollection, userDoc.uid);
            await setDoc(userRef, user);

            setLoading(false);
            return true;

        } catch (error) {
            setLoading(false);
            console.error('Error adding user: ', error);
            setError('Ocurrió un error al crear el usuario');
            return false;
        }
    };


    const getUsers = async () => {
        try {
            setLoading(true);
            const userCollection = collection(db, 'users');
            const querySnapshot = await getDocs(userCollection);
            const users = [];

            querySnapshot.forEach((doc) => {
                const userModel = UserModel.fromFirestore(doc);
                users.push(userModel);
            });

            setLoading(false);
            return users;
        } catch (error) {
            setLoading(false);
            console.error('Error fetching users: ', error);
            setError('Ocurrió un error al obtener los usuarios');
            return [];
        }
    };

    const updateUser = async (userId, formData) => {
        setLoading(true);
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                setError('El usuario no existe');
                return false; // Devolver false si el usuario no existe
            }

            // Actualizar el estado de la tarea
            await updateDoc(userRef, formData);

            // Verificar si la actualización se realizó correctamente
            const updatedUserDoc = await getDoc(userRef);
            const updatedData = updatedUserDoc.data();

            if (updatedData === formData) {
                setLoading(false);
                return true; // Devolver true si el estado se actualizó correctamente
            } else {
                setLoading(false);
                setError('Error: No se pudo actualizar el usuario');
                return false; // Devolver false si no se pudo actualizar el estado
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating user: ', error);
            setError('Ocurrió un error al actualizar el usuario');
            return false;
        }
    };

    const getUser = async (userId) => {
        try {
            setLoading(true);
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                setError('El usuario no existe');
                setLoading(false);
                return null;
            }

            setLoading(false);
            return UserModel.fromFirestore(userDoc);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching user: ', error);
            setError('Ocurrió un error al obtener el usuario');
            return null;
        }
    };

    return { error, addUser, getUsers, updateUser, getUser, loading };
};

export default useUserApi;