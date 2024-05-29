import React, { useState, useEffect } from 'react';
import BurndownChart from '../../Components/Metricas/BurndownChart';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Spinner from '../../utils/Spinner';

const Metricas = () => {
    const [burndownData, setBurndownData] = useState([]);
    const [selectedSection, setSelectedSection] = useState('estimation');
    const [totalEstimate, setTotalEstimate] = useState(0);
    const [totalConsumed, setTotalConsumed] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://backend-lumotareas.vercel.app/bdownchart');
                const data = await response.json();
                setBurndownData(data.burndownData);

                // Calculate total estimates and total real values
                if (data.burndownData.length > 0) {
                    const totalEst = data.burndownData[0].estimate;
                    const remaining = data.burndownData[data.burndownData.length - 1].real;
                    const totalCons = totalEst - remaining;

                    setTotalEstimate(totalEst);
                    setRemaining(remaining);
                    setTotalConsumed(totalCons);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    let sidebarItems = [
        { key: 'estimation', label: 'Estimación', icon: 'fa-chart-line' },
        { key: 'by-section', label: 'Por sección', icon: 'fa-chart-pie' },
        { key: 'by-user', label: 'Por usuario', icon: 'fa-chart-bar' },
    ];

    const renderContent = () => {
        if (isLoading) {
            return <Spinner text={"Cargando datos..."} />;
        }

        switch (selectedSection) {
            case 'estimation':
                return <BurndownChart burndownData={burndownData} totalEstimate={totalEstimate} totalConsumed={totalConsumed} remaining={remaining} />;
            case 'by-section':
                return <div>Por sección</div>;
            case 'by-user':
                return <div>Por usuario</div>;
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

export default Metricas;
