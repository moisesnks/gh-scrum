import React from "react";
import styled from "styled-components";

const TaskContainer = styled.li`
    margin-bottom: 20px;
`;

const Task = ({ task }) => {
    return (
        <TaskContainer>
            <h3>{task.titulo}</h3>
            <p>{task.descripcion}</p>
            <p>{task.autorName}</p>
        </TaskContainer>
    );
};

export default Task;
