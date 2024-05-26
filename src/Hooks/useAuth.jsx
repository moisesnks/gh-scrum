import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, getIdToken, updateProfile, getIdTokenResult } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            setToken(user ? await getIdToken(user) : null);
            setLoading(false);
            setIsAdmin(user ? (await getIdTokenResult(user)).claims.admin : false);

            if (user) {
                document.title = `LumoAgile - ${user.displayName}`
            } else {
                document.title = 'LumoAgile';
            }
        });

        return unsubscribe;
    }, []);

    const updateDisplayName = async (displayName) => {
        try {
            await updateProfile(auth.currentUser, { displayName });
            setUser(auth.currentUser);
        } catch (error) {
            console.error('Error updating display name:', error);
            throw error;
        }
    };


    const register = async (data) => {
        const { email, password, displayName, rut } = data;
        const request = { email, password, displayName, rut };

        setLoading(true);
        try {
            const response = await fetch('https://backend-lumotareas.vercel.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const token = await getIdToken(response.user);
            setToken(token);
            setUser(response.user);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getName = () => {
        let name = user.displayName;
        while (!name) {
            name = prompt('Please enter your name');
            if (name) {
                updateDisplayName(name);
            } else {
                alert('You must enter a name');
            }
        }
        return name;
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, updateDisplayName, token, isAdmin, getName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
