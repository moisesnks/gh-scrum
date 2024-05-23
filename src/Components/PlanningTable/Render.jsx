// Path: src/Components/PlanningTable/Render.jsx
import React from "react";
import RenderUser from "./RenderUser";
import RenderTable from "./RenderTable";
import RenderResults from "./RenderResults";

function Render({ users }) {
    const [isRevealed, setIsRevealed] = React.useState(false);
    const [results, setResults] = React.useState(null);

    const getMetricas = () => {
        const usersFlat = Object.values(users).flat();
        // Un array sólo con las cartas seleccionadas parseadas a número
        const selectedCards = usersFlat.map(user => parseInt(user.selectedCard, 10)).filter(card => !isNaN(card));
        const max = Math.max(...selectedCards);
        const min = Math.min(...selectedCards);
        const avg = Math.ceil(selectedCards.reduce((acc, card) => acc + card, 0) / selectedCards.length);
        // La cantidad de usuarios que seleccionaron la misma carta que el avg
        const agreedRate = usersFlat.filter(user => parseInt(user.selectedCard, 10) === avg).length / usersFlat.length * 100;
        return { max, min, avg, agreedRate };
    }

    const handleReveal = () => {
        setIsRevealed(true);
        setResults(getMetricas());
    }

    const handleClear = () => {
        setIsRevealed(false);
        setResults(null);
    }

    return (
        <>
            <button onClick={handleClear}>Limpiar</button>
            <div
                style={{ display: "flex", justifyContent: "center" }}
            >
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
                <RenderResults results={results} />
            </div>
        </>
    );
}

export default Render;