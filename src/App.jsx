import React from "react";
import IssueCard from "./IssueCard/IssueCard.jsx";
import Avatar from "./Avatar/Avatar.jsx";
import issues from "./IssuesList/mockup_issues.js"
import IssuesList from "./IssuesList/IssuesList.jsx"
import './App.css'

const issue = {
  "title": "Go",
  "tag": "Spike - Backend",
  "issue_number": "16",
  "opened_by": "zkodah",
  "opened_date": "Apr 24, 2024",
  "num_tasks": "2",
  "project_info": {
    "Priority": "",
    "Size": "",
    "Estimate": "8"
  }
};

const asignados = [
  { "name": "moisesnks", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fmoisesnks.png?alt=media" },
  { "name": "smnzin", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fsmnzin.jpg?alt=media" },
  { "name": "juan", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Frickroll.jpg?alt=media" },
  { "name": "héctor salamanca" },
  { "name": "lucas arancibia" },
];

export default function App() {
  return (
    <div className="App">
      <div className="half-side">
        <IssuesList issues={issues} />
      </div>
      <div className="half-side">
        <IssueCard issue={issue} isBusy={true} assignedTo={asignados} />
        <Avatar />
      </div>
    </div>
  );
}
