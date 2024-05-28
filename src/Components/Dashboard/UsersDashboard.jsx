import React, { useState } from 'react';
import UserForm from '../UserForm/UserForm.jsx';
import CsvImporter from '../CsvImporter/CsvImporter.jsx';
import ManagementUsers from '../Usuarios/ManagemenetUsers.jsx';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar.jsx';

import useManagementUsers from '../Usuarios/useManagementUsers.jsx';

const Dashboard = () => {
    const { addUser } = useManagementUsers();
    const [selectedSection, setSelectedSection] = useState('users');

    const sidebarItems = [
        { key: 'create', icon: 'fa-user-plus', label: 'Crear usuario' },
        { key: 'csv', icon: 'fa-file-csv', label: 'Importar usuarios' },
        { key: 'users', icon: 'fa-users', label: 'Listar usuarios' }
    ];

    const handleUserCreation = (newUser) => {
        console.log("New user created:", newUser);
        addUser(newUser);
    };

    const handleCsvSave = (updatedUsers) => {
        console.log("CSV users updated:", updatedUsers);

        updatedUsers.forEach(user => {
            addUser(user);
        });
    };

    const renderContent = () => {
        switch (selectedSection) {
            case 'create':
                return <UserForm onSave={handleUserCreation} />;
            case 'csv':
                return <CsvImporter onSave={handleCsvSave} />;
            case 'users':
                return <ManagementUsers />;
            default:
                return <h2>Seleccione una opción</h2>;
        }
    };

    return (
        <main className="dashboard">
            <Sidebar items={sidebarItems} onSelect={setSelectedSection} />
            <section className="dashboard-content">
                {renderContent()}
            </section>
        </main>
    );
};

export default Dashboard;
