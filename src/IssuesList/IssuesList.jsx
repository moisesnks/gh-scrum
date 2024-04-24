import React from 'react'
import IssueCard from '../IssueCard/IssueCard.jsx'
import './IssuesList.css'
const IssuesList = ({ issues }) => {
    return (
        <div className="issues-list-container">
            <ul className="issues-list">
                {issues.map((issue, index) => {
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

