import "./styles.css";
import React from "react";

function RenderUser({ user, isRevealed }) {
    const isRevealedClass = isRevealed ? "revealed" : "";
    const classCard = user.selectedCard ? `card-container selected ${isRevealedClass}` : "card-container";
    return (
        <div className="table-module player-container">
            <div className="player-module player-wrapper">
                <div className={`player-module ${classCard}`}>
                    {isRevealed && user.selectedCard ? user.selectedCard : ""}
                </div>
                <div className="player-module profile-container">
                    {user.displayName}
                </div>
            </div>
        </div>
    );
}

function RenderTable({ users, onReveal }) {
    // users es un array de objetos con la siguiente estructura
    // {displayName: "Juan", selectedCard: "5"}
    // {displayName: "Pedro", selectedCard: ""}
    // {displayName: "Maria", selectedCard: ""}
    // {displayName: "Jose", selectedCard: ""}

    // si todos los usuarios tienen una carta seleccionada, es decir != ""
    // entonces se habilita el boton de revelar cartas

    const isRevealed = users.every(user => user.selectedCard !== "");
    const [countdown, setCountdown] = React.useState(null);

    const handleReveal = () => {
        setCountdown(3);
        const interval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setCountdown(null);
            onReveal();
        }, 3000);
    };

    return (
        <>
            {/* Table */}
            <div className="table-module table">
                <div className="table-module table-content">
                    {isRevealed ?
                        <div className="table-content reveal-button-wrapper">
                            {countdown === null ? (
                                <button onClick={handleReveal}>
                                    Revelar cartas
                                </button>
                            ) : (
                                <div>{countdown} </div>
                            )}
                        </div>
                        :
                        <div>Esperando a que todos voten...</div>
                    }
                </div>
            </div> {/* Fin de table */}
        </>
    );
}

function Render({ users, onClear }) {

    const [isRevealed, setIsRevealed] = React.useState(false);
    const [results, setResults] = React.useState(null);

    const handleClear = () => {
        onClear();
        setIsRevealed(false);
        setResults(null);
    }

    const handleReveal = () => {
        const usersArray = Object.values(users).flat();
        console.log("Los usuarios han revelado sus cartas", usersArray)

        const metricas = {
            max: 0,
            min: 0,
            avg: 0,
        };

        const selectedCards = usersArray.map(user => user.selectedCard);

        // Calcular las métricas
        let total = selectedCards.length;
        let sum = selectedCards.reduce((acc, card) => acc + parseInt(card), 0);
        metricas.max = Math.max(...selectedCards);
        metricas.min = Math.min(...selectedCards);
        // Promedio calcula el promedio y luego redondea al más cercano en fibonnaci debe asegurarse de que el promedio sea un número de fibonacci
        // asegurarse de que el promedio sea un número de fibonacci
        const fibonacci = [1, 2, 3, 5, 8];
        metricas.avg = fibonacci.reduce((prev, curr) => (Math.abs(curr - sum / total) < Math.abs(prev - sum / total) ? curr : prev));

        metricas.agreedRate = Math.floor(selectedCards.filter(card => parseInt(card) === metricas.avg).length / total * 100);


        // Actualizar el estado
        setIsRevealed(true);
        setResults(metricas);
    }

    return (
        <>
            <button onClick={handleClear}>Limpiar</button>
            <div className="table-module">
                <div className="table-module wrapper">
                    <div className="table-module container">
                        <div /> {/* Espacio en blanco */}

                        {/* Top */}
                        <div className="table-module top">
                            {users.top.map((user, index) => (
                                <RenderUser key={index} user={user} isRevealed={isRevealed} />
                            ))
                            }

                        </div> {/* Fin de top */}

                        <div /> {/* Espacio en blanco */}

                        {/* Left */}
                        <div className="table-module left">
                            {users.left.map((user, index) => (
                                <RenderUser key={index} user={user} isRevealed={isRevealed} />
                            ))
                            }
                        </div> {/* Fin de left */}

                        <RenderTable users={Object.values(users).flat()} onReveal={handleReveal} />

                        {/* Right */}
                        <div className="table-module right">
                            {users.right.map((user, index) => (
                                <RenderUser key={index} user={user} isRevealed={isRevealed} />
                            ))
                            }
                        </div> {/* Fin de right */}

                        <div /> {/* Espacio en blanco */}

                        {/* Bottom */}
                        <div className="table-module bottom">
                            {users.bottom.map((user, index) => (
                                <RenderUser key={index} user={user} isRevealed={isRevealed} />
                            ))
                            }
                        </div> {/* Fin de bottom */}
                    </div> {/* Fin de container */}
                </div> {/* Fin de wrapper */}
            </div> {/* Fin de table-module */}
            <RenderResults results={results} />
        </>
    )
}

function CircleProgress({ value, size = 100 }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            {/* Círculo gris de fondo */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="gray"
                strokeWidth="10"
            />
            {/* Círculo azul de progreso */}
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#09f"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={-offset}
                transform="rotate(-90 50 50)"
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="1.5rem"
                fill="#000"
            >
                {`${value}%`}
            </text>
        </svg>
    );
}



function RenderResults({ results }) {
    if (!results) {
        return null;
    }

    return (
        <div className="results">
            <div className="results-wrapper">
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
                                <CircleProgress value={results.agreedRate} size={70} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlanningTable({ users, onClear }) {
    return <Render users={users} onClear={onClear} />;
}


export default PlanningTable;