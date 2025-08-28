import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './TodoList.css';

const TodoList: React.FC = () => {
  const history = useHistory();
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
      setShowInput(false);
    }
  };

  const handleNewReminderClick = () => {
    setShowInput(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="todo-list-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>

        {/* Header */}
        <div className="todo-header">
          <button className="back-button" onClick={handleBackClick}>
            <img src="/assets/icons/icons2/211686_back_arrow_icon.svg" alt="Back" />
          </button>
          <h1 className="page-title">To-do list</h1>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-checkbox"></div>
              <span className="task-text">{task}</span>
              <button 
                className="remove-task-btn"
                onClick={() => handleRemoveTask(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Task Input Section - Only show when adding new task */}
        {showInput && (
          <div className="task-input-section">
            <div className="task-input-container">
              <div className="checkbox-placeholder"></div>
              <input
                type="text"
                className="task-input"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* New Reminder Button */}
        <div className="new-reminder-section">
          <button className="new-reminder-btn" onClick={handleNewReminderClick}>
            <div className="plus-icon">+</div>
            <span>New Reminder</span>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;
