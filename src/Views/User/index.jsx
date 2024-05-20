import React from "react";
import UserDetails from "../../Components/Usuarios/UserDetails";

const UserPage = () => {
    // Get the user id from the URL
    const userId = window.location.pathname.split('/').pop();

    return (
        <div className="container">
            <UserDetails id={userId} />
        </div>
    );
}

export default UserPage;