import React from 'react';
import { AvatarListCompact } from '../../Avatars';

import { MainIcon, TasksIcon } from '../../Icons';
import Priority from '../../utils/Priority';

import './Task.css';

const Task = ({ task, avatars, handleDrop, handleRemoveAvatar }) => {
    const { isBusy = false } = task;
    const priorityStyles = Priority.getPriorityStyles(task.project_info.Priority);

    const assignedAvatars = task.assignedAvatars.map((avatarId) =>
        avatars.find((avatar) => avatar.id === avatarId)
    );

    return (
        <div className="task-container">
            <div className='main-title'>
                <div className=" main-icon">
                    <MainIcon isBusy={isBusy} />
                </div>
                <h3 className="task-title">{task.title}</h3>
                <div className="subtitle">
                    <span> {task.tag} </span>
                    <span style={priorityStyles} className='tag'> {task.project_info.Priority} </span>
                    <div
                        className="drag-drop-area"
                        onDrop={(event) => {
                            const avatarId = event.dataTransfer.getData('avatarId');
                            handleDrop(task.id, avatarId);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        Selecciona un avatar y arrástralo aquí
                    </div>
                </div>
            </div>

            <div className="project-info">
                <div className="num_tasks">
                    Estimate: {task.project_info.Estimate}
                </div>
                <div className="num_tasks">
                    Size: {task.project_info.Size}
                </div>
                < div className="num_tasks">
                    <TasksIcon />
                    <div> {task.num_tasks} tasks </div>
                </div>
            </div>

            <div className="author">
                <div>{`${task.opened_date}`}</div>
                <div>{`@${task.opened_by}`}</div>
            </div>

            {
                task.assignedAvatars.length > 0 && (
                    <AvatarListCompact
                        assignedAvatars={assignedAvatars}
                        onRemoveAvatar={(avatarId) => handleRemoveAvatar(task.id, avatarId)}
                    />
                )
            }

        </div >
    );
};

export default Task;
