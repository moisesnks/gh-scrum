import React from "react";
import IssueCard from "./IssueCard/IssueCard.jsx";
import Avatar from "./Avatar/Avatar.jsx";
import "./App.css";
import issues from "./IssuesList/mockup_issues.js"
import IssuesList from "./IssuesList/IssuesList.jsx"
import AvatarsList from "./AvatarsList/AvatarsList.jsx"
import './App.css'

const issue = {
  Title: "Workflow",
  Tag: "Feature - Devops",
  IssueNumber: 15,
  OpenedBy: "moisesnks",
  OpenedDate: "24-04-2024",
  Estimate: 25,
  Tasks: 15,
};

const personas = [
  { "name": "moisesnks", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fmoisesnks.png?alt=media", "capacity": 10 },
  { "name": "smnzin", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fsmnzin.jpg?alt=media", "capacity": 15 },
  { "name": "juan", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Frickroll.jpg?alt=media", "capacity": 18 },
  { "name": "héctor salamanca", "capacity": 21 },
  { "name": "lucas arancibia", "capacity": 10 },
  { "name": "Lukas Medina", "capacity": 10 },
  { "name": "Mauricio", "capacity": 10 },
  { "name": "Cristian", "capacity": 10 },
  { "name": "Javier", "capacity": 10 },
];

const multiplicarPersonas = (personas, cantidad) => {
  const result = [];
  for (let i = 0; i < cantidad; i++) {
    result.push(...personas);
  }
  return result;
}

export default function App() {
  return (
    <div className="container">
      <div className="navbar"></div>
      <div className="body">
        <div className="left-side">
          <IssueCard issue={issue} isBusy={true} assignedTo={asignados} />
          <IssueCard issue={issue} />
        </div>
        <div className="right-side">
          <Avatar capacity={0} data={asignados[0]} />
          <Avatar capacity={18} data={asignados[1]} />
          <Avatar capacity={16} data={asignados[2]} />
          <Avatar capacity={10} data={asignados[3]} />
          <Avatar capacity={8} data={asignados[4]} />
        </div>
      </div>
      <div className="App">
        <div className="half-side">
          <IssuesList issues={issues} />
        </div>
        <div className="half-side">
          <AvatarsList personas={multiplicarPersonas(personas, 4)} />
        </div>
      </div>
      );
}
