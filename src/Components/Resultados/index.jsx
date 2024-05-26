import React, { useState } from 'react';

import './Resultados.css';
import CircleProgress from '../CircleProgress/index.jsx';

function Resultados({ results }) {
    console.log(results);

    return (
        <div className="alert stats">
            <div className="results-container">
                <div className="results-title">
                    Resultados
                </div>
                <div className="results-content">
                    <div className="results-content-item">
                        <div className="results-content-item-title">
                            Max
                        </div>
                        <div className="results-content-item-value">
                            {results.max}
                        </div>
                    </div>
                    <div className="results-content-item">
                        <div className="results-content-item-title">
                            Min
                        </div>
                        <div className="results-content-item-value">
                            {results.min}
                        </div>
                    </div>
                    <div className="results-content-item">
                        <div className="results-content-item-title">
                            Avg
                        </div>
                        <div className="results-content-item-value">
                            {results.avg}
                        </div>
                    </div>
                    <div className="results-content-item">
                        <div className="results-content-item-title">
                            Agreed rate
                        </div>
                        <div className="results-content-item-value">
                            <CircleProgress value={results.ratio} size={70} color="#2FD02F" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Resultados;