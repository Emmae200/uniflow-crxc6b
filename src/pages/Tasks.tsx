import React, { useState } from 'react';
import { IonButton, IonIcon, IonInput } from '@ionic/react';
import { add, checkmark, close } from 'ionicons/icons';
import './Tasks.css';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSaveTask = () => {
    if (newTaskName.trim()) {
      setTasks([...tasks, newTaskName.trim()]);
      setNewTaskName('');
      setIsAddingTask(false);
    }
  };

  const handleCancelTask = () => {
    setNewTaskName('');
    setIsAddingTask(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTask();
    } else if (e.key === 'Escape') {
      handleCancelTask();
    }
  };

  return (
    <div className="tasks-container">
      <p className="tasks-description">
        These are the activities you plan to carry out in order to achieve your desired targets
      </p>
      
      <div className="tasks-list">
        {tasks.length === 0 && !isAddingTask ? (
          <div className="no-tasks">
            <p>No task created</p>
          </div>
        ) : (
          <>
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <div className="task-checkbox"></div>
                <span className="task-text">{task}</span>
              </div>
            ))}
            {isAddingTask && (
              <div className="task-item new-task-input">
                <div className="task-checkbox"></div>
                <IonInput
                  value={newTaskName}
                  onIonInput={(e) => setNewTaskName(e.detail.value || '')}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter task name..."
                  className="task-input"
                  autoFocus
                />
                <div className="task-actions">
                  <IonButton fill="clear" size="small" onClick={handleSaveTask} className="save-btn">
                    <IonIcon icon={checkmark} />
                  </IonButton>
                  <IonButton fill="clear" size="small" onClick={handleCancelTask} className="cancel-btn">
                    <IonIcon icon={close} />
                  </IonButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isAddingTask && (
        <div className="new-task-button">
          <IonButton fill="clear" className="add-task-btn" onClick={handleAddTask}>
            <IonIcon icon={add} className="add-icon" />
            <span>New Task</span>
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default Tasks;
