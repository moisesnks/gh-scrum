import { useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "./Hooks/useAuth";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthProvider>
            {outlet}
        </AuthProvider>
    );

};
