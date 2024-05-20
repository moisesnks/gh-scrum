import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
    let error = useRouteError();

    const renderError = () => {
        if (error) {
            return (
                <div>
                    <h2>{error.message}</h2>
                    <p>{error.stack}</p>
                </div>
            );
        }
    };
    return (
        <div className='container'>
            <h1>Ha ocurrido un error</h1>
            <p>Detalles del error:</p>
            {renderError()}
            <Link to='/'>Volver al inicio</Link>
        </div>
    );
};

export default ErrorComponent;
