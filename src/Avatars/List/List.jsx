import React from "react";
import Avatar from "../Avatar/Avatar";
import "./List.css"; // Importar el archivo CSS

const List = ({ avatars }) => {
    return (
        <div className="list-avatar-container">
            {avatars.map((avatar) => (
                <Avatar key={avatar.id} {...avatar} />
            ))}
        </div>
    );
};

export default List;
