import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BottomNavigation from '../components/BottomNavigation';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  
  // UI Enhancement states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Calendar states
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAllEventsPopup, setShowAllEventsPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPriority, setEventPriority] = useState<'low' | 'medium' | 'critical'>('low');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [events, setEvents] = useState<Array<{
    id: string;
    title: string;
    time: string;
    date: string;
    priority: 'low' | 'medium' | 'critical';
  }>>([]);

  // Task states
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'critical'>('low');
  const [tasks, setTasks] = useState<Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'critical';
    completed: boolean;
  }>>([]);

  const toggleCalendarDropdown = () => {
    setShowCalendarDropdown(!showCalendarDropdown);
  };

  const handleAddEvent = () => {
    setShowCalendarDropdown(false);
    setShowCalendarPopup(true);
  };

  const handleDeleteEvent = () => {
    setShowCalendarDropdown(false);
    if (events.length === 0) {
      alert('No events to delete');
      return;
    }
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      setEventToDelete(null);
    } else {
      // Delete all events if no specific event is selected
      setEvents([]);
    }
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setEventToDelete(null);
  };

  const handleSelectEventToDelete = (eventId: string) => {
    setEventToDelete(eventId);
  };

  const handleShowAllEvents = () => {
    setShowAllEventsPopup(true);
  };

  const handleCloseAllEvents = () => {
    setShowAllEventsPopup(false);
  };

  // Sort events by date and get the closest 2
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const closestEvents = sortedEvents.slice(0, 2);
  const remainingEvents = sortedEvents.slice(2);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // UI Enhancement functions
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getLastRefreshString = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastRefresh.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleWeeklyScheduleClick = () => {
    console.log('Home: Weekly Schedule clicked');
    console.log('Current location:', window.location.pathname);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    // Try React Router first, then fallback to window.location
    try {
      history.push('/weekly-schedule');
      console.log('Home: React Router navigation attempted');
    } catch (error) {
      console.error('Home: React Router failed, using window.location:', error);
      window.location.href = '/weekly-schedule';
    }
  };

  // Effects for UI enhancements
  useEffect(() => {
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleSaveEvent = () => {
    if (selectedDate && eventTitle && eventTime) {
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        time: eventTime,
        date: selectedDate.toLocaleDateString(),
        priority: eventPriority
      };
      setEvents([...events, newEvent]);
      setShowCalendarPopup(false);
      setSelectedDate(null);
      setEventTitle('');
      setEventTime('');
      setEventPriority('low');
    }
  };

  const handleClosePopup = () => {
    setShowCalendarPopup(false);
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
    setEventPriority('low');
  };

  // Task functions
  const handleAddTask = () => {
    setShowTaskPopup(true);
  };

  const handleSaveTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: '',
        priority: taskPriority,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setShowTaskPopup(false);
      setTaskTitle('');
      setTaskPriority('low');
    }
  };

  const handleCloseTaskPopup = () => {
    setShowTaskPopup(false);
    setTaskTitle('');
    setTaskPriority('low');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };



  const handleTasksCompletedClick = () => {
    history.push('/todo-list');
  };







  return (
    <IonPage>
      <IonContent fullscreen className="dashboard-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>
        
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="greeting">
            <h1>{getGreeting()},</h1>
            <h2>{user?.name || 'User'}</h2>
            <div className="time-info">
              <span className="current-time">{getCurrentTimeString()}</span>
              <span className="last-refresh">Last updated: {getLastRefreshString()}</span>
            </div>
          </div>
          <div className="header-icons">
            <button 
              className={`refresh-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleRefresh}
              title="Refresh dashboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </button>
            <div className="streak-icon">
              <img src="/assets/icons/fire_streak.png" alt="Streak" className="flame-icon" />
              <span>5</span>
            </div>
          </div>
        </div>





        {/* Metrics Grid */}
                 <div className="metrics-grid">
           <div className="metric-card" onClick={() => {
             console.log('Today\'s Classes card clicked!');
             console.log('About to call handleWeeklyScheduleClick');
             try {
               handleWeeklyScheduleClick();
               console.log('handleWeeklyScheduleClick completed successfully');
             } catch (error) {
               console.error('Error in handleWeeklyScheduleClick:', error);
             }
           }}>
             <div className="metric-icon">
               <img src="/assets/icons/calendar.png" alt="Calendar" />
             </div>
             <div className="metric-content">
               <h3>Today's Classes</h3>
               <p>4 scheduled</p>
             </div>
             <div className="card-arrow">→</div>
           </div>
           <div className="metric-card" onClick={handleTasksCompletedClick}>
             <div className="metric-icon clipboard-icon">
               <img src="/assets/icons/clipboard.png" alt="Tasks" />
             </div>
             <div className="metric-content">
               <h3>Tasks Completed</h3>
               <p>3/5</p>
             </div>
             <div className="card-arrow">→</div>
           </div>
           <div className="metric-card">
             <div className="metric-icon">
               <img src="/assets/icons/books.png" alt="Study" />
             </div>
             <div className="metric-content">
               <h3>Study Session</h3>
               <p>1 hr 30 mins</p>
             </div>
           </div>
           <div className="metric-card">
             <div className="metric-icon">
               <img src="/assets/icons/bar_chart.png" alt="Productivity" />
             </div>
             <div className="metric-content">
               <h3>Productivity Score</h3>
               <p>85%</p>
             </div>
           </div>
         </div>



        {/* Calendar and Study Tracker Grid */}
        <div className="calendar-study-grid">
          {/* Calendar Section */}
          <div className="section-card calendar-section">
            <div className="section-header">
              <div className="section-title">
                <img src="/assets/icons/icons2/calendar_icon.svg" alt="Calendar" className="section-icon" />
                <h2>Calendar</h2>
              </div>
              <div className="section-options">
                <button className="dropdown-toggle" onClick={toggleCalendarDropdown}>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </button>
                {showCalendarDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleDeleteEvent}>Delete Event</button>
                  </div>
                )}
              </div>
            </div>
            <div className="section-content">
              {events.length === 0 ? (
                <div className="no-events">
                  <p>No events</p>
                </div>
              ) : (
                <div className="events-container">
                  <div className="events-list">
                    {closestEvents.map((event) => (
                      <div key={event.id} className="event-item">
                        <div className={`event-dot ${event.priority}-priority`}></div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <p>{event.time}</p>
                        </div>
                        <button 
                          className="delete-event-btn"
                          onClick={() => handleSelectEventToDelete(event.id)}
                          title="Delete this event"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {remainingEvents.length > 0 && (
                    <div className="more-events-section">
                      <button 
                        className="more-events-btn"
                        onClick={handleShowAllEvents}
                      >
                        +{remainingEvents.length} more
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Study Tracker Section */}
          <div className="section-card study-tracker-section">
            <div className="section-header">
              <div className="section-title">
                <h2>Study Tracker</h2>
              </div>
            </div>
            <div className="section-content">
              <div className="study-progress">
                <div className="course-info">
                  <h3>GEC104</h3>
                  <div className="progress-container">
                    <div className="progress-bar study-progress-bar">
                      <div className="progress-fill study-progress-fill" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="study-actions">
                  <span className="progress-text">Week 4 of 12 completed</span>
                  <button className="resume-button">Resume Study</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="tasks-section-container">
          <div className="tasks-section">
            <div className="tasks-header">
              <h3>Today's Tasks</h3>
            </div>
            <div className="tasks-content">
              {tasks.length === 0 ? (
                <div className="no-tasks">
                  <p>No tasks yet</p>
                </div>
              ) : (
                <div className="task-list">
                  {tasks.map((task) => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                      <div 
                        className={`task-checkbox ${task.completed ? 'completed' : ''}`}
                        onClick={() => handleToggleTask(task.id)}
                      >
                        {task.completed && '✓'}
                      </div>
                      <div className="task-content">
                        <span className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</span>
                      </div>
                      <div className={`task-priority-dot ${task.priority}-priority`}></div>
                      <button 
                        className="task-delete"
                        onClick={() => handleDeleteTask(task.id)}
                        title="Delete this task"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="add-task-button" onClick={handleAddTask}>+</button>
          </div>
        </div>

        {/* Bottom spacer div */}
        <div className="bottom-spacer"></div>

        {/* Spacer div to fix scrolling issue */}
        <div className="scroll-spacer"></div>

        {/* Bottom Navigation */}
        <BottomNavigation />

         {/* Calendar Popup */}
         {showCalendarPopup && (
           <div className="modern-modal-overlay">
             <div className="modern-modal-content calendar-modal">
               <div className="modal-header">
                 <div className="modal-icon">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"/>
                   </svg>
                 </div>
                 <h2>Add New Event</h2>
                 <p>Schedule an event for your calendar</p>
                 <button className="close-btn" onClick={handleClosePopup}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                   </svg>
                 </button>
               </div>
               
               <div className="modal-body">
                 {/* Calendar Header */}
                 <div className="calendar-header">
                   <button className="month-nav-button" onClick={handlePreviousMonth}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                     </svg>
                   </button>
                   <div className="month-year-display">
                     <h4>{getMonthName(currentMonth)} {currentMonth.getFullYear()}</h4>
                   </div>
                   <button className="month-nav-button" onClick={handleNextMonth}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                     </svg>
                   </button>
                 </div>

                 {/* Day Headers */}
                 <div className="day-headers">
                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                     <div key={day} className="day-header">{day}</div>
                   ))}
                 </div>

                 {/* Calendar Grid */}
                 <div className="calendar-grid">
                   {/* Empty cells for days before the first day of the month */}
                   {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                     <div key={`empty-${i}`} className="calendar-day empty"></div>
                   ))}
                   
                   {/* Days of the month */}
                   {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                     const day = i + 1;
                     const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                     const isSelected = selectedDate && 
                       selectedDate.getDate() === day && 
                       selectedDate.getMonth() === currentMonth.getMonth() && 
                       selectedDate.getFullYear() === currentMonth.getFullYear();
                     
                     return (
                       <button
                         key={day}
                         className={`calendar-day ${isSelected ? 'selected' : ''}`}
                         onClick={() => handleDateSelect(date)}
                       >
                         {day}
                       </button>
                     );
                   })}
                 </div>
                 
                 <div className="input-group">
                   <label>Event Title</label>
                   <div className="input-wrapper">
                     <textarea
                       placeholder="What's the event about?"
                       value={eventTitle}
                       onChange={(e) => setEventTitle(e.target.value)}
                       className="modern-textarea"
                       maxLength={100}
                       rows={3}
                     />
                     <div className="input-counter">
                       {eventTitle.length}/100
                     </div>
                   </div>
                 </div>

                 <div className="input-group">
                   <label>Event Time</label>
                   <div className="input-wrapper">
                     <input
                       type="time"
                       value={eventTime}
                       onChange={(e) => setEventTime(e.target.value)}
                       className="modern-input"
                     />
                   </div>
                 </div>
                 
                 <div className="priority-selector">
                   <label>Priority Level</label>
                   <div className="priority-options">
                     <button
                       type="button"
                       className={`priority-option ${eventPriority === 'low' ? 'selected' : ''}`}
                       onClick={() => setEventPriority('low')}
                     >
                       <div className="priority-indicator low"></div>
                       <span>Low</span>
                       <small>Not urgent</small>
                     </button>
                     <button
                       type="button"
                       className={`priority-option ${eventPriority === 'medium' ? 'selected' : ''}`}
                       onClick={() => setEventPriority('medium')}
                     >
                       <div className="priority-indicator medium"></div>
                       <span>Medium</span>
                       <small>Important</small>
                     </button>
                     <button
                       type="button"
                       className={`priority-option ${eventPriority === 'critical' ? 'selected' : ''}`}
                       onClick={() => setEventPriority('critical')}
                     >
                       <div className="priority-indicator critical"></div>
                       <span>Critical</span>
                       <small>Urgent</small>
                     </button>
                   </div>
                 </div>
               </div>
               
               <div className="modal-actions">
                 <button 
                   className="btn-secondary" 
                   onClick={handleClosePopup}
                 >
                   Cancel
                 </button>
                 <button 
                   className="btn-primary" 
                   onClick={handleSaveEvent}
                   disabled={!eventTitle.trim() || !selectedDate}
                 >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                   </svg>
                   Save Event
                 </button>
               </div>
             </div>
           </div>
         )}

          {/* Delete Event Popup */}
          {showDeletePopup && (
            <div className="modern-modal-overlay">
              <div className="modern-modal-content delete-modal">
                <div className="modal-header">
                  <div className="modal-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                  </div>
                  <h2>Delete Event</h2>
                  <p>Choose what you want to delete</p>
                  <button className="close-btn" onClick={handleCancelDelete}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="delete-options">
                    {events.length > 0 && (
                      <div className="delete-option">
                        <button 
                          className={`delete-option-btn ${eventToDelete === null ? 'selected' : ''}`}
                          onClick={() => setEventToDelete(null)}
                        >
                          <div className="delete-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                          </div>
                          <div className="delete-option-content">
                            <span className="delete-option-title">Delete All Events</span>
                            <span className="delete-option-count">({events.length} events)</span>
                          </div>
                        </button>
                      </div>
                    )}
                    
                    {events.map((event) => (
                      <div key={event.id} className="delete-option">
                        <button 
                          className={`delete-option-btn ${eventToDelete === event.id ? 'selected' : ''}`}
                          onClick={() => setEventToDelete(event.id)}
                        >
                          <div className={`event-dot ${event.priority}-priority`}></div>
                          <div className="event-info">
                            <span className="event-title">{event.title}</span>
                            <span className="event-time">{event.time}</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-danger" 
                    onClick={handleConfirmDelete}
                    disabled={events.length === 0}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Events Popup */}
          {showAllEventsPopup && (
            <div className="calendar-popup-overlay">
              <div className="calendar-popup all-events-popup">
                <div className="popup-header">
                  <h3>All Events</h3>
                  <button className="close-button" onClick={handleCloseAllEvents}>×</button>
                </div>
                
                <div className="popup-content">
                  <div className="all-events-list">
                    {sortedEvents.map((event) => (
                      <div key={event.id} className="all-event-item">
                        <div className={`event-dot ${event.priority}-priority`}></div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <div className="event-meta">
                            <span className="event-date">{event.date}</span>
                            <span className="event-time">{event.time}</span>
                          </div>
                        </div>
                        <button 
                          className="delete-event-btn"
                          onClick={() => handleSelectEventToDelete(event.id)}
                          title="Delete this event"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="popup-actions">
                    <button className="cancel-button" onClick={handleCloseAllEvents}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task Popup */}
          {showTaskPopup && (
            <div className="modern-modal-overlay">
              <div className="modern-modal-content">
                <div className="modal-header">
                  <div className="modal-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                    </svg>
                  </div>
                  <h2>Add New Task</h2>
                  <p>Create a new task to stay organized</p>
                  <button className="close-btn" onClick={handleCloseTaskPopup}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="input-group">
                    <label>Task Description</label>
                    <div className="input-wrapper">
                      <textarea
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        rows={3}
                        maxLength={100}
                        className="modern-textarea"
                      />
                      <div className="input-counter">
                        {taskTitle.length}/100
                      </div>
                    </div>
                  </div>
                  
                  <div className="priority-selector">
                    <label>Priority Level</label>
                    <div className="priority-options">
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'low' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('low')}
                      >
                        <div className="priority-indicator low"></div>
                        <span>Low</span>
                        <small>Not urgent</small>
                      </button>
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'medium' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('medium')}
                      >
                        <div className="priority-indicator medium"></div>
                        <span>Medium</span>
                        <small>Important</small>
                      </button>
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'critical' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('critical')}
                      >
                        <div className="priority-indicator critical"></div>
                        <span>Critical</span>
                        <small>Urgent</small>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={handleCloseTaskPopup}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleSaveTask}
                    disabled={!taskTitle.trim()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  };

export default Home;
