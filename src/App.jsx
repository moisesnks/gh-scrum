import React, { lazy } from 'react';
import { useAvatarScores, AvatarList } from './Avatars';
import { ListTasks } from './Tasks';
import './App.css';

import initialAvatars from './Avatars/avatars_mockup';
import tasks from './Tasks/tasks_mockup';

const App = () => {



  const { avatars, updateAvatarScore } = useAvatarScores(initialAvatars);


  return (
    <div className="container">
      <div className="header">
        <h1>Lumo Scrum</h1>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <div className="section">
            <h2 className="section-header">Avatars</h2>
            <AvatarList avatars={avatars} />
          </div>
        </div>
        <div className="flex-item">
          <div className="section">
            <h2 className="section-header">Tasks</h2>
            <ListTasks tasks={tasks} avatars={avatars} updateAvatarScore={updateAvatarScore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
