// Path: src/Components/Metricas/EstimationChart.jsx

import React, { useState, useEffect } from 'react';
import './EstimationChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const EstimationChart = () => {
    const E_values = [1, 3, 5, 8]; // Valores de esfuerzo
    const I_values = [1, 2, 3, 4, 5]; // Valores de incertidumbre

    const [esfuerzo, setEsfuerzo] = useState(E_values[0]);
    const [incertidumbre, setIncertidumbre] = useState(I_values[0]);
    const [numPersonas, setNumPersonas] = useState(1);

    const [data, setData] = useState({
        labels: I_values,
        datasets: [
            {
                label: 'Estimación en Horas',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.5)',
            },
        ],
    });

    useEffect(() => {
        const newData = I_values.map(I => Math.min(esfuerzo ** 2 * I ** 1.5, 14) * numPersonas);
        setData(currentData => ({
            ...currentData,
            datasets: [{
                ...currentData.datasets[0],
                data: newData,
            }],
        }));
    }, [esfuerzo, incertidumbre, numPersonas]);

    return (
        <div className='estimation-chart'>
            <div className='slider'>
                <div className="slider-label">
                    <span className='h3'>Esfuerzo</span>
                    <span>{esfuerzo}</span>
                </div>
                <input type="range" min={1} max={8} step={1} value={esfuerzo} onChange={e => setEsfuerzo(Number(e.target.value))} list="tickmarks" />
            </div>
            <div className='slider'>
                <div className="slider-label">
                    <span className='h3'>Incertidumbre</span>
                    <span>{incertidumbre}</span>
                </div>
                <input type="range" min={1} max={5} step={1} value={incertidumbre} onChange={e => setIncertidumbre(Number(e.target.value))} list="tickmarksI" />
                <span>{incertidumbre}</span>
            </div>
            <div className='slider'>
                <label>Número de Personas:</label>
                <input type="number" min={1} max={10} value={numPersonas} onChange={e => setNumPersonas(Number(e.target.value))} />
                <span>{numPersonas}</span>
            </div>
            <Line data={data} />
        </div>
    );
};

export default EstimationChart;
