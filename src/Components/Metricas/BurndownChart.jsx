import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './BurndownChart.css';
ChartJS.register(...registerables);

const BurndownChart = ({ burndownData, totalEstimate, totalConsumed, remaining }) => {
    // Lógica del componente
    const [sliderValue, setSliderValue] = useState(burndownData.length - 1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(1);
    const playIntervalRef = useRef(null);

    const filteredData = burndownData.slice(0, sliderValue + 1);

    const chartData = {
        labels: filteredData.map(item => item.fecha),
        datasets: [
            {
                label: 'Estimate',
                data: filteredData.map(item => item.estimate),
                fill: false,
                borderColor: 'orange',
                tension: 0.1,
                pointBackgroundColor: 'orange'
            },
            {
                label: 'Real',
                data: filteredData.map(item => item.real),
                fill: false,
                borderColor: 'red',
                tension: 0.1,
                pointBackgroundColor: 'red'
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        }
    };

    const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value));
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setSliderValue(prev => Math.min(prev + 1, burndownData.length - 1));
    };

    const handlePrev = () => {
        setSliderValue(prev => Math.max(prev - 1, 0));
    };

    const handleSpeedChange = (event) => {
        setPlaySpeed(Number(event.target.value));
    };

    useEffect(() => {
        if (isPlaying) {
            playIntervalRef.current = setInterval(() => {
                setSliderValue(prev => {
                    if (prev < burndownData.length - 1) {
                        return prev + 1;
                    } else {
                        return 0; // Reiniciar el slider cuando llegue al final
                    }
                });
            }, 1000 / playSpeed);
        } else {
            clearInterval(playIntervalRef.current);
        }
        return () => clearInterval(playIntervalRef.current);
    }, [isPlaying, playSpeed, burndownData.length]);

    return (
        <div className='burndown-chart'>
            <h2>Burndown Chart</h2>
            <div className='burndown-info'>
                <p>Capacidad Estimada Total: {totalEstimate}</p>
                <p>Capacidad Consumida Total: {totalConsumed}</p>
                <p>Capacidad Restante: {remaining}</p>
            </div>
            <Line data={chartData} options={options} />
            <div className='controls'>
                <button onClick={handlePrev}><i className="fa fa-backward"></i></button>
                <button onClick={handlePlayPause}>
                    {isPlaying ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
                </button>
                <button onClick={handleNext}><i className="fa fa-forward"></i></button>
                <select onChange={handleSpeedChange} value={playSpeed}>
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>
            <div className='slider-container'>
                <input
                    type='range'
                    min='0'
                    max={burndownData.length - 1}
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
                <span>{filteredData[filteredData.length - 1].fecha}</span>
            </div>
        </div>
    );
};

export default BurndownChart;
