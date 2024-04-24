import React from "react";
import IssueCard from "./IssueCard/IssueCard.jsx";
import Avatar from "./Avatar/Avatar.jsx";
import "./App.css";
import issues from "./IssuesList/mockup_issues.js"
import IssuesList from "./IssuesList/IssuesList.jsx"
import AvatarsList from "./AvatarsList/AvatarsList.jsx"
import './App.css'


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
          <IssuesList issues={issues} />
        </div>
        <div className="right-side">
          <AvatarsList personas={multiplicarPersonas(personas, 4)} />
        </div>
      </div>
    </div>
  );
}
