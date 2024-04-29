import React, { useState } from "react";
import "./Filtro.css";

const Filtro = ({ onFiltrar, onSearchTermChange }) => {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState("libres");

    const handleClick = (filtro) => {
        setFiltroSeleccionado(filtro);
        onFiltrar(filtro);
    };

    const handleInputChange = (event) => {
        const newTerm = event.target.value;
        onSearchTermChange(newTerm);
    };

    return (
        <div className="container-filtro">
            <button className={filtroSeleccionado === "libres" ? "btn-libres selected" : "btn-libres"} onClick={() => handleClick("libres")}>Ver Libres</button>
            <button className={filtroSeleccionado === "ocupadas" ? "btn-ocupadas selected" : "btn-ocupadas"} onClick={() => handleClick("ocupadas")}>Ver Ocupadas</button>
            <button className={filtroSeleccionado === "todas" ? "btn-todas selected" : "btn-todas"} onClick={() => handleClick("todas")}>Ver Todas</button>
            <input type="text" placeholder="Buscar..." onChange={handleInputChange} />
        </div>
    );
};

export default Filtro;
