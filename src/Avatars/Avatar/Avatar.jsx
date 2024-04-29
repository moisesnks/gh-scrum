import React from "react";
import "./Avatar.css";



const Avatar = ({ id, name = "Sin Nombre", icon, score = 0, isDraggable = true, outletElement }) => {
    const avatarIcon = icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&rounded=true&size=48`;

    const MAX_SCORE = 24;


    const angulo = 360 - ((score / MAX_SCORE) * 360);

    // Estilo dinámico para el gradiente, verde/blanco
    const gradientStyle = {
        background: `conic-gradient(from 0deg, white ${angulo}deg, #00ff00 ${angulo}deg, #00ff00 360deg)`
    };

    // Estilo dinámico para el círculo flotante
    const floatingCircleStyle = {
        position: 'absolute',
        top: '-1em',
        right: '-1em',
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

    const isOpaque = score >= MAX_SCORE ? 'opaque' : '';
    const isAlert = score >= MAX_SCORE ? 'text-alert' : '';
    const isFull = score === MAX_SCORE ? (
        <div className="is-full">
            (IS FULL)
        </div>
    ) : null;

    const alertaExclamacion = score > MAX_SCORE ? (
        <div className="alerta-exclamacion">
            !!
        </div>
    ) : null;

    const handleDragStart = (e) => {
        if (isDraggable) {
            console.log('Drag start - Avatar:', id);
            e.dataTransfer.setData('avatarId', id);
        }
    };

    return (
        <div
            className="avatar-container-avatar"
            draggable={isDraggable}
            onDragStart={handleDragStart}
            style={{ position: 'relative' }}
        >
            <div className="avatar-circle-avatar" style={gradientStyle}>
                <img
                    src={avatarIcon}
                    alt={name}
                    className={`${isOpaque}`}
                />
                {alertaExclamacion}
                {isFull}
            </div>
            <div style={floatingCircleStyle}>{score}</div>
            <span className={`avatar-name-avatar ${isAlert}`} style={{ fontWeight: 'bold' }}>
                {name}
            </span>

            {outletElement && (
                <div className="outlet-avatar">
                    {outletElement}
                </div>
            )}
        </div>
    );
};

export default Avatar;
