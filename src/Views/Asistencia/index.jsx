import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useAuth } from "../../Hooks/useAuth";
import CsvAsistencia from "../../Components/CsvAsistencia/CsvAsistencia.jsx";
import DateRangePicker from "../../Components/DateRangePicker/DateRangePicker.jsx";

const Configuracion = ({ initialDate, endDate, onRangeDateChange }) => {
    // Función para actualizar el intervalo de fechas
    const handleDateRangeChange = ({ startDate, endDate }) => {
        console.log("Date range changed:", startDate, endDate);
        // no actuar si alguna de las fechas es inválida
        if (!startDate || !endDate) {
            return;
        }
        // Llamar a la función proporcionada por el padre con las fechas seleccionadas
        onRangeDateChange({ startDate, endDate });
        alert(`Se ha actualizado el rango de fechas a ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`)
    };

    return (
        <div>
            <h2>Configuración</h2>
            {/* asistencia comprendida entre: {} y {} */}
            <h3> Asistencia comprendida entre: {initialDate.toLocaleDateString()} y {endDate.toLocaleDateString()}</h3>
            <DateRangePicker
                initialStartDate={initialDate}
                initialEndDate={endDate}
                onDateRangeChange={handleDateRangeChange}
            />
        </div>
    );
};


const Asistencia = () => {

    const { isAdmin } = useAuth();

    const [selectedSection, setSelectedSection] = useState('create');
    const [initialDate, setInitialDate] = useState(new Date(2024, 4, 6));
    const [endDate, setEndDate] = useState(new Date(2024, 4, 26));
    const apiUrl = "http://localhost:3000/logs";
    const [logs, setLogs] = useState([]);


    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setLogs(data.logs));
    }, []);



    let sidebarItems = [
        { key: 'create', label: 'Tomar asistencia', admin: true, icon: 'fa-plus' },
        { key: 'import', label: 'Importar asistencia (csv)', icon: 'fa-file-import' },
        { key: 'export', label: 'Exportar asistencia', icon: 'fa-file-export' },
        { key: 'settings', label: 'Configuración', admin: true, icon: 'fa-cog' }

    ];

    if (!isAdmin) {
        sidebarItems = sidebarItems.filter(item => !item.admin);
    }

    const handleAttendanceChange = (name, date, isChecked) => {
        console.log(`Attendance change for ${name} on ${date}: ${isChecked}`);
        // Realizar una solicitud al backend para actualizar la asistencia
        fetch(apiUrl + '/change-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                name,
                isChecked,
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Attendance change for ${name} on ${date}: ${isChecked}`);
                } else {
                    console.error('Failed to change attendance:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        window.location.reload();
    };

    const handleCeremonyChange = (date, value) => {
        console.log(`Ceremony change on ${date}: ${value}`);
        // Realizar una solicitud al backend para actualizar la ceremonia
        fetch(apiUrl + '/add-ceremony', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                value,
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Ceremony change on ${date}: ${value}`);
                } else {
                    console.error('Failed to change ceremony:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        window.location.reload();

    };


    const renderContent = () => {
        switch (selectedSection) {
            case 'create':
                return <CsvAsistencia
                    logs={logs}
                    initialDate={initialDate}
                    endDate={endDate}
                    onConfirmAttendanceChange={handleAttendanceChange}
                    onConfirmCeremonyChange={handleCeremonyChange}
                />;
            case 'import':
                return <h2>Importar la asistencia</h2>;
            case 'export':
                return <h2>Exportar asistencias</h2>;
            case 'settings':
                return <Configuracion initialDate={initialDate} endDate={endDate} onRangeDateChange={({ startDate, endDate }) => {
                    setInitialDate(startDate);
                    setEndDate(endDate);
                }} />;
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

export default Asistencia;