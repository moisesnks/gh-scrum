// Path: src/Components/PlanningTable/index.jsx
import "./styles.css";
import React from "react";

import Render from "./Render";


function PlanningTable({ users, onClear, onReveal, onEncrypt, isRevealed }) {
    return <Render users={users} onClear={onClear} onReveal={onReveal} onEncrypt={onEncrypt} isRevealed={isRevealed} />;
}


export default PlanningTable;