import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
    return (
        <div>
            <h1>¡Oops! Algo salió mal.</h1>
            <p>Lo sentimos, ha ocurrido un error inesperado.</p>
            <p>
                Puedes volver atrás haciendo clic en el siguiente enlace:
                <Link to="/">Volver</Link>
            </p>
        </div>
    );
};

export default ErrorComponent;
