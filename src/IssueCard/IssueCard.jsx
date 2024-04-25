import React from "react";
import "./IssueCard.css";
import { MainIcon, TasksIcon } from "../Icons";
import ModalAdditionalAssigned from "./ModalAdditionalAssigned";

const IssueCard = ({ issue }) => {
    const { isBusy = false, assignedTo = [{ name: "", icon: "" }] } = issue;
    const showAssigned = isBusy && assignedTo.length > 0;
    const additionalAssigned = assignedTo.slice(1);

    return (
        <div className="issue-card">
            <div className="title">
                <MainIcon isBusy={isBusy} />
                <div className="subtitle">
                    <h1>{issue.title}</h1>
                    <div className="tag"> {issue.tag} </div>
                </div>
            </div>
            <div className="author d-flex gap-sm">
                <div>{`${issue.opened_date}`}</div>
                <div>{`@${issue.opened_by}`}</div>
            </div>
            <div className="d-flex gap-sm project-info">
                <div>Estimate: {issue.project_info.Estimate}</div>
                <div>Size: {issue.project_info.Size}</div>
                <div>Priority: {issue.project_info.Priority}</div>
                <div className="d-flex gap-xs">
                    <TasksIcon />
                    <div> {issue.num_tasks} tasks </div>
                </div>
            </div>

            {showAssigned && (
                <div className="assigned">
                    <img src={assignedTo[0].icon} alt={assignedTo[0].name} />
                    <span><b> {assignedTo[0].name} </b> </span>
                    {additionalAssigned.length > 0 && (
                        <ModalAdditionalAssigned additionalAssigned={assignedTo} />
                    )}
                </div>
            )}
        </div>
    );
};

export default IssueCard;
