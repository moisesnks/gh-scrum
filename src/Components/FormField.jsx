import React from 'react';

export const options = [
    { value: 'front', label: 'Frontend' },
    { value: 'back', label: 'Backend' },
    { value: 'qa', label: 'QA' },
    { value: 'devops', label: 'DevOps' },
    { value: 'infra', label: 'Infraestructura' },
    { value: 'design', label: 'Diseño' },
    { value: 'sec', label: 'Seguridad' },
    { value: 'pm', label: 'Project Manager' },
    { value: 'scrum', label: 'Scrum Master' },
    { value: 'seclead', label: 'Líder de Seguridad' },
    { value: 'tl', label: 'Líder Técnico' },
    { value: 'infralead', label: 'Líder de Infraestructura' },
    { value: 'other', label: 'Otro' },
];

export const rolOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'guest', label: 'Invitado' },
];

export const TeamOptions = [
    { value: 'management-team', label: 'Equipo de gestión' },
    { value: 'development-team', label: 'Equipo de desarrollo' },
];
export const FormName = ({ editedUser = {}, handleFieldChange }) => (
    <input
        type="text"
        value={editedUser.displayName}
        onChange={(e) => handleFieldChange(e, 'displayName')}
        className="edit-input"
    />
);

export const FormEmail = ({ editedUser = {}, handleFieldChange }) => (
    <input
        type="email"
        value={editedUser.email}
        onChange={(e) => handleFieldChange(e, 'email')}
        className="edit-input"
    />
);

export const FormRut = ({ editedUser = {}, handleFieldChange }) => (
    <input
        type="text"
        value={editedUser.rut}
        onChange={(e) => handleFieldChange(e, 'rut')}
        className="edit-input"
    />
);

export const FormCargo = ({ editedUser = {}, handleFieldChange }) => (
    <select
        value={editedUser.cargo}
        onChange={(e) => handleFieldChange(e, 'cargo')}
        className="edit-input"
    >
        {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

export const FormCapacidad = ({ editedUser = {}, handleFieldChange }) => (
    <input
        type="number"
        value={editedUser.capacidad}
        onChange={(e) => handleFieldChange(e, 'capacidad')}
        className="edit-input"
    />
);

export const FormTeam = ({ editedUser = {}, handleFieldChange }) => (
    <select
        value={editedUser.equipo}
        onChange={(e) => handleFieldChange(e, 'equipo')}
        className="edit-input"
    >
        {TeamOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);

export const FormRol = ({ editedUser = {}, handleFieldChange }) => (
    <select
        value={editedUser.rol}
        onChange={(e) => handleFieldChange(e, 'rol')}
        className="edit-input"
    >
        {rolOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
    </select>
);
