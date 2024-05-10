import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Hooks/useAuth";
import NavBar from "./NavBar";

export const ProtectedLayout = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <NavBar onLogout={logout} />
            <Outlet /> {/* Render child routes */}
        </div>
    )
};

