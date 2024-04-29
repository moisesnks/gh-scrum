import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";

export const ProtectedLayout = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/home/form">Crear Tarea</Link>
                <button onClick={logout}>Cerrar Sesión</button>
            </nav>
            <Outlet /> {/* Render child routes */}
        </div>
    )
};

