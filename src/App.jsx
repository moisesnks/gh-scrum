import React from "react";
import issues from "./IssuesList/mockup_issues.js"
import IssuesList from "./IssuesList/IssuesList.jsx"
import Avatar from "./Avatar/Avatar.jsx"
import './App.css'

const personas = [
  { "name": "moisesnks", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fmoisesnks.png?alt=media" },
  { "name": "smnzin", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Fsmnzin.jpg?alt=media" },
  { "name": "juan", "icon": "https://firebasestorage.googleapis.com/v0/b/lumo-ghub.appspot.com/o/public%2Frickroll.jpg?alt=media" },
  { "name": "héctor salamanca" },
  { "name": "lucas arancibia" },
]


export default function App() {
  return (
    <div className="App">
      <div className="half-side">
        <IssuesList issues={issues} />
      </div>

    </div>
  );
}
