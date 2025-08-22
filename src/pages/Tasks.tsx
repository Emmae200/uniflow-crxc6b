import React, { useState, useRef } from 'react';
import { IonButton, IonIcon, IonInput, IonActionSheet } from '@ionic/react';
import { add, checkmark, close, trash, create } from 'ionicons/icons';
import './Tasks.css';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressDelay = 500; // 0.5 seconds

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleSaveTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: newTaskName.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
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

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleTouchStart = (taskId: string) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedTaskId(taskId);
      setShowActionSheet(true);
    }, longPressDelay);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleEditTask = () => {
    if (selectedTaskId) {
      const task = tasks.find(t => t.id === selectedTaskId);
      if (task) {
        setEditingTask(selectedTaskId);
        setEditingName(task.name);
      }
    }
    setShowActionSheet(false);
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      setTasks(tasks.filter(task => task.id !== selectedTaskId));
    }
    setShowActionSheet(false);
  };

  const handleSaveEdit = () => {
    if (editingTask && editingName.trim()) {
      setTasks(tasks.map(task => 
        task.id === editingTask 
          ? { ...task, name: editingName.trim() }
          : task
      ));
      setEditingTask(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditingName('');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
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
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                onTouchStart={() => handleTouchStart(task.id)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(task.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <div 
                  className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => handleTaskToggle(task.id)}
                >
                  {task.completed && <IonIcon icon={checkmark} className="check-icon" />}
                </div>
                {editingTask === task.id ? (
                  <IonInput
                    value={editingName}
                    onIonInput={(e) => setEditingName(e.detail.value || '')}
                    onKeyDown={handleEditKeyPress}
                    className="task-input"
                    autoFocus
                  />
                ) : (
                  <span className="task-text">{task.name}</span>
                )}
                {editingTask === task.id && (
                  <div className="task-actions">
                    <IonButton fill="clear" size="small" onClick={handleSaveEdit} className="save-btn">
                      <IonIcon icon={checkmark} />
                    </IonButton>
                    <IonButton fill="clear" size="small" onClick={handleCancelEdit} className="cancel-btn">
                      <IonIcon icon={close} />
                    </IonButton>
                  </div>
                )}
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

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={[
          {
            text: 'Edit',
            icon: create,
            handler: handleEditTask
          },
          {
            text: 'Delete',
            icon: trash,
            role: 'destructive',
            handler: handleDeleteTask
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]}
      />
    </div>
  );
};

export default Tasks;
