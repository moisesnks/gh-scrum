import React, { useState } from "react";
import TaskList from "../../Components/Tareas/TaskList";
import TaskForm from "../../Components/Tareas/TaskForm";

import Sidebar from "../../Components/Sidebar/Sidebar";
import { useAuth } from "../../Hooks/useAuth";


const Home = () => {
    const [selectedSection, setSelectedSection] = useState('list');

    const { isAdmin } = useAuth();


    let sidebarItems = [
        { key: 'create', icon: 'fa-plus', label: 'Crear tarea', admin: true },
        { key: 'list', icon: 'fa-list-ul', label: 'Listar tareas' },
        { key: 'list-unique', icon: 'fa-clipboard-list', label: 'Listar tareas asignadas' },
    ];

    if (!isAdmin) {
        sidebarItems = sidebarItems.filter(item => !item.admin);
    }

    const renderContent = () => {
        switch (selectedSection) {
            case 'create':
                return <TaskForm />;
            case 'list':
                return <TaskList asignadas={false} key={1} />;
            case 'list-unique':
                return <TaskList asignadas={true} key={2} />;
            default:
                return <h2>Seleccione una opción</h2>;
        }
    }



    return (
        <>
            <main className="dashboard">
                <Sidebar items={sidebarItems} onSelect={setSelectedSection} />
                <section className="dashboard-content">
                    {renderContent()}
                </section>
            </main>
        </>
    );
};

export default Home;