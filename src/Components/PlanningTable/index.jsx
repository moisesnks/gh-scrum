// Path: src/Components/PlanningTable/index.jsx
import "./styles.css";
import React from "react";

import Render from "./Render";


function PlanningTable({ users, onClear }) {
    return <Render users={users} onClear={onClear} />;
}


export default PlanningTable;