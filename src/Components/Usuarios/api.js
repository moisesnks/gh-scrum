// path: src/Components/Usuarios/api.js

import { db, auth } from '../../firebaseConfig';
import { collection, getDocs, getDoc, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import UserModel from './UserModel';

const useUserApi = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const generatePasswordFromEmailAndRut = (email, rut) => {
        const emailPrefix = email.split('@')[0]; // Obtiene la parte antes del '@' del correo
        const rutDigits = rut.replace('-', '').slice(-3); // Obtiene los últimos 3 dígitos del RUT sin guion

        // Combina partes del correo y del RUT para crear una contraseña
        const password = `${emailPrefix}${rutDigits}`;

        return password;
    };

    const deleteUserById = async (userId) => {
        try {
            setLoading(true);
            const userRef = doc(db, 'users', userId);
            await deleteDoc(userRef);
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            console.error('Error deleting user: ', error);
            setError('Ocurrió un error al eliminar el usuario');
            return false;
        }
    };

    const addUser = async (user) => {
        const { email, rut } = user;

        try {
            setLoading(true);

            // Generar una contraseña basada en el correo y el RUT
            const password = generatePasswordFromEmailAndRut(email, rut);
            console.log('Generated password:', password);

            // Crear usuario en Firebase Authentication con la contraseña generada
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userDoc = userCredential.user;

            if (!userDoc) {
                setLoading(false);
                setError('Error al crear el usuario: No se pudo obtener el usuario creado');
                console.error('Error: No se pudo obtener el usuario creado');
                return false;
            }

            console.log('User created successfully:', userDoc);

            // Crear documento en la colección 'users' con el UID como ID
            const userCollection = collection(db, 'users');
            const userRef = doc(userCollection, userDoc.uid); // Referenciar el documento con el UID

            await setDoc(userRef, {
                ...user,
                uid: userDoc.uid // Incluir el UID como parte de los datos del documento
            });

            console.log('User document created successfully:', user);

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
                return false;
            }

            // Actualizar el documento del usuario con los nuevos datos
            await updateDoc(userRef, formData);

            // Si no se lanzó una excepción, considerar la actualización como exitosa
            setLoading(false);
            return true;
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

    return { error, addUser, getUsers, updateUser, getUser, loading, deleteUserById };
};

export default useUserApi;