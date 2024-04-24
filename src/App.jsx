import React from "react";
import IssueCard from "./IssueCard/IssueCard.jsx";
import Avatar from "./Avatar/Avatar.jsx";
import "./App.css";

const issue = {
  Title: "Workflow",
  Tag: "Feature - Devops",
  IssueNumber: 15,
  OpenedBy: "moisesnks",
  OpenedDate: "24-04-2024",
  Estimate: 25,
  Tasks: 15,
};

const asignados = [
  {
    name: "moisesnks",
    icon: "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fmoisesnks.png?alt=media",
  },
  {
    name: "smnzin",
    icon: "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fsmnzin.jpg?alt=media",
  },
  {
    name: "juan",
    icon: "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Frickroll.jpg?alt=media",
  },
  { name: "héctor salamanca" },
  { name: "lucas arancibia" },
];

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
    </div>
  );
}
