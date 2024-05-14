import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFirebaseAuth from "./useFirebaseAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, loading, error, signInWithEmailAndPassword, signOut, createUser } = useFirebaseAuth();
    const navigate = useNavigate();

    const login = async (email, password) => {
        await signInWithEmailAndPassword(email, password);
        navigate('/home');
    };

    const logout = async () => {
        await signOut();
        navigate('/', { replace: true });
    };

    const registerUser = async (email, password) => {
        await createUser(email, password);
        navigate('/home');
    };

    const value = useMemo(() => ({ user, loading, error, login, logout, registerUser }), [user, loading, error, registerUser]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};