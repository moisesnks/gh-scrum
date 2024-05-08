import React from "react";
import TaskList from "../../Components/Tareas/TaskList";
const Home = () => {

    return (
        <div className="container">
            <div className="header">
                <h1>Lumo Scrum</h1>
            </div>
            <div className="content">
                <TaskList />
            </div>

        </div>
    );
};

export default Home;