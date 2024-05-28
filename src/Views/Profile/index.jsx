import React, { useState } from 'react';

import { useAuth } from '../../Hooks/useAuth';

import './Profile.css';

const FieldText = ({ label, value, onChange, isEditing = null }) => {
    return (
        <div className="profile-info-item">
            <label>{label}</label>
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    readOnly
                />

            )}
        </div>
    );
}

const Avatar = ({ user, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        onEdit();
    }

    return (
        <div className="avatar">
            <div className="avatar-edit" onClick={handleEdit}>
                {isEditing ?
                    <i className="fas fa-times"></i>
                    :
                    <i className="fas fa-edit"></i>
                }
            </div>
            <img src={user.photoURL} alt="Avatar" />
        </div>
    );
};

const Profile = () => {
    const { user } = useAuth(); // user es un User de firebase
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName); // es editable
    const [email, setEmail] = useState(user.email); // no es editable


    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div className="profile">
            <h1>Perfil</h1>
            <div className="profile-info">
                <div className="profile-info-header">
                    <Avatar user={user} onEdit={handleEdit} />

                </div>
                <div className="profile-fields">
                    <FieldText
                        label="Nombre"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        isEditing={isEditing}
                    />
                    <FieldText
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {isEditing && (
                    <button className="profile-save">
                        <i className="fas fa-save"></i>
                        Guardar
                    </button>
                )
                }
            </div>
        </div>
    );

}

export default Profile;

