import React, { useState } from 'react'
import IssueCard from '../IssueCard/IssueCard.jsx'
import './IssuesList.css'
import Filtro from '../utils/Filtro/Filtro.jsx' // Asegúrate de que la ruta sea correcta

const IssuesList = ({ issues }) => {
    const [filtro, setFiltro] = useState("libres");

    const filtrarIssues = (tipoFiltro) => {
        setFiltro(tipoFiltro);
    }

    let issuesFiltradas = issues;
    if (filtro === "ocupadas") {
        issuesFiltradas = issues.filter(issue => issue.isBusy);
    } else if (filtro === "libres") {
        issuesFiltradas = issues.filter(issue => !issue.isBusy);
    }

    return (
        <div className="issues-list-container">
            <Filtro onFiltrar={filtrarIssues} /> {/* Aquí agregamos el componente Filtro */}
            <ul className="issues-list">
                {issuesFiltradas.map((issue, index) => {
                    return (
                        <li key={index}>
                            <IssueCard issue={issue} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default IssuesList;
