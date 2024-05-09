import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword as signInWithEmail, signOut as signOutAuth } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const useFirebaseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const signInWithEmailAndPassword = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            await signInWithEmail(auth, email, password);
            console.log('Sign in successful');
        } catch (error) {
            setError(error.message);
            console.error('Sign in error:', error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Signing out...');
            await signOutAuth(auth);
        } catch (error) {
            setError(error.message);
            console.error('Sign out error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, signInWithEmailAndPassword, signOut };
};

export default useFirebaseAuth;
