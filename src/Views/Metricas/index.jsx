// Path: src/Views/Metricas/index.jsx

import React from 'react';
import EstimationChart from '../../Components/Metricas/EstimationChart';

const Metricas = () => {
    return (
        <div className='container'>
            <h1>Métricas</h1>
            <EstimationChart />
        </div>
    );
}

export default Metricas;
