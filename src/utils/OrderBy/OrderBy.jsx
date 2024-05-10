import React, { useState } from 'react';
import './OrderBy.css';

const OrderBy = ({ onOrderBy }) => {
    const [orderBy, setOrderBy] = useState({ field: 'priority', order: 'low to high' });

    const handleOrderBy = (field) => {
        if (orderBy.field === field) {
            // Alternar el orden si se hace clic en el mismo campo
            const newOrder = orderBy.order === 'low to high' ? 'high to low' : 'low to high';
            setOrderBy({ field, order: newOrder });
            onOrderBy({ field, order: newOrder });
        } else {
            // Establecer el nuevo campo de ordenación y reiniciar al orden por defecto (low to high)
            setOrderBy({ field, order: 'low to high' });
            onOrderBy({ field, order: 'low to high' });
        }
    };

    return (
        <div className="container-orderby">
            <button className={orderBy.field === 'id' ? 'btn-orderby selected' : 'btn-orderby'} onClick={() => handleOrderBy('id')}>
                ID {orderBy.field === 'id' && (orderBy.order === 'low to high' ? '↓' : '↑')}
            </button>
            <button className={orderBy.field === 'estimate' ? 'btn-orderby selected' : 'btn-orderby'} onClick={() => handleOrderBy('estimate')}>
                Estimación {orderBy.field === 'estimate' && (orderBy.order === 'low to high' ? '↓' : '↑')}
            </button>
            <button className={orderBy.field === 'priority' ? 'btn-orderby selected' : 'btn-orderby'} onClick={() => handleOrderBy('priority')}>
                Prioridad {orderBy.field === 'priority' && (orderBy.order === 'low to high' ? '↓' : '↑')}
            </button>
            <button className={orderBy.field === 'size' ? 'btn-orderby selected' : 'btn-orderby'} onClick={() => handleOrderBy('size')}>
                Tamaño {orderBy.field === 'size' && (orderBy.order === 'low to high' ? '↓' : '↑')}
            </button>

        </div>
    );
};

export default OrderBy;
