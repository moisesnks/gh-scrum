// ProtectedLayout.jsx
import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";

export const ProtectedLayout = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    const outlet = useOutlet();

    return (
        <div>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/form">Crear Tarea</Link>
                <button onClick={logout}>Cerrar Sesión</button>
            </nav>
            {outlet}
        </div>
    )
};
