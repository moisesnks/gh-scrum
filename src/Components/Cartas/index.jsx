
import React, { useState, useEffect } from 'react';
import './Cartas.css';

function Cartas({ initialCard = "", onClick }) {
    const [selectedCard, setSelectedCard] = useState(initialCard);

    useEffect(() => {
        setSelectedCard(initialCard);
    }, [initialCard]);

    const cartas = ['1', '2', '3', '5', '8'];

    return (
        <div className='cartas'>
            {cartas.map((carta) => {
                const isSelected = carta === selectedCard;
                const className = isSelected ? 'carta carta-seleccionada' : 'carta';
                return (
                    <div
                        key={carta}
                        className={className}
                        onClick={() => {
                            onClick(carta);
                            setSelectedCard(carta);
                        }}
                    >
                        {carta}
                    </div>
                )
            })}
        </div>
    );
}

export default Cartas;