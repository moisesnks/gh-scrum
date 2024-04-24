import React from 'react';
import './Avatar.css'; // Archivo CSS para los estilos

const Avatar = ({ data }) => {
    // Si no se proporciona data, se puede usar un objeto vacío como valor por defecto
    const { name = 'Anónimo', icon = `https://ui-avatars.com/api/?name=${name}`, capacity = 0 } = data || {};

    // Calculamos el ángulo del gradiente cónico basado en el capacity proporcionado, pero invertido
    const angulo = 360 - ((capacity / 16) * 360);

    // Estilo dinámico para el gradiente
    const gradientStyle = {
        background: `conic-gradient(from 0deg, white ${angulo}deg, purple ${angulo}deg, purple 360deg)`
    };

    // Estilo dinámico para el círculo flotante
    const floatingCircleStyle = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px'
    };

    const isOpaque = capacity >= 16 ? 'opaque' : '';
    const isAlert = capacity >= 16 ? 'text-alert' : '';
    const isFull = capacity === 16 ? (
        <div className="is-full">
            está lleno!
        </div>
    ) : null;

    const alertaExclamacion = capacity > 16 ? (
        <div className="alerta-exclamacion">
            !!
        </div>
    ) : null;

    return (
        <div className="avatar-container" style={{ position: 'relative' }}>
            <div className="avatar-circle" style={gradientStyle}>
                <img className={`${isOpaque}`} src={icon} alt={name} />
                <div className="floating-circle" style={floatingCircleStyle}>{capacity}</div>
                {alertaExclamacion}
                {isFull}
            </div>
            <span className={isAlert}>{name}</span>
        </div>
    );
};

export default Avatar;