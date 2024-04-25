import React from "react";
import issues from "./IssuesList/mockup_issues.js"
import avatars from "./AvatarsList/mockup_avatars.js";
import IssuesList from "./IssuesList/IssuesList.jsx"
import AvatarsList from "./AvatarsList/AvatarsList.jsx"
import './App.css'

export default function App() {
  return (
    <div className="App">
      <div className="half-side">
        <IssuesList issues={issues} />
      </div>
      <div className="half-side">
        <AvatarsList personas={avatars} />
      </div>
    </div>
  );
}