import React from "react";
import "./IssueCard.css";
import { MainIcon, TasksIcon } from "../Icons";

const IssueCard = ({ issue, isBusy = false, assignedTo = [""] }) => {
    const showAssigned = isBusy && assignedTo.length > 0;
    const additionalAssigned = Math.max(0, assignedTo.length - 1);

    return (
        <div className="issue-card">
            <MainIcon isBusy={isBusy} />
            <h1>{issue.Title}</h1>
            <div className="secondTitle">
                <p>{`${issue.OpenedDate}`}</p>
                <p>{`@${issue.OpenedBy}`}</p>
                <p>Estimado: {issue.Estimate}</p>
            </div>
            <p> </p>
            <div className="tasks">
                <TasksIcon />
                <p> {issue.Tasks} tasks </p>
            </div>
            <p className="tag">{issue.Tag}</p>
            {showAssigned && (
                <div className="tag">
                    <div className="assigned">
                        <img
                            src={assignedTo[0].icon}
                            alt={assignedTo[0].name}
                        />
                        <span><b> {assignedTo[0].name} </b> </span>
                        {additionalAssigned > 0 && (
                            <span className="circle">{`+${additionalAssigned}`}</span>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default IssueCard;
