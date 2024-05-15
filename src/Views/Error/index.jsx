import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComponent = ({ error }) => {
    return (
        <div>
            <h1>Error</h1>
            <p>{error}</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default ErrorComponent;
