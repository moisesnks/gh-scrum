import React, { useState } from "react";
import "./Filtro.css"; // Asegúrate de tener un archivo CSS para los estilos del filtro

const Filtro = ({ onFiltrar }) => {
    const [filtroSeleccionado, setFiltroSeleccionado] = useState("libres");

    const handleClick = (filtro) => {
        setFiltroSeleccionado(filtro);
        onFiltrar(filtro);
    };

    return (
        <div className="container-filtro">
            <button className={filtroSeleccionado === "libres" ? "btn-libres selected" : "btn-libres"} onClick={() => handleClick("libres")}>Ver Libres</button>
            <button className={filtroSeleccionado === "ocupadas" ? "btn-ocupadas selected" : "btn-ocupadas"} onClick={() => handleClick("ocupadas")}>Ver Ocupadas</button>
            <button className={filtroSeleccionado === "todas" ? "btn-todas selected" : "btn-todas"} onClick={() => handleClick("todas")}>Ver Todas</button>
        </div>
    );
};

export default Filtro;
