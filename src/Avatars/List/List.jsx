import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./List.css";

const List = ({ avatars }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAvatars = avatars.filter((avatar) =>
        avatar.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-avatar-container">
            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredAvatars.map((avatar) => (
                <Avatar key={avatar.id} {...avatar} />
            ))}
        </div>
    );
};

export default List;
