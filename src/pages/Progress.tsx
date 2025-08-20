import React from 'react';
import './Progress.css';

const Progress: React.FC = () => {

  return (
    <div className="progress-container">
      <p className="progress-description">
        Visual and analytical summary of your performance
      </p>
      
      <div className="weekly-progress">
        <div className="progress-bars">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={index} className="progress-day">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ height: `${[70, 70, 70, 60, 70, 70, 70][index]}%` }}
                ></div>
              </div>
              <span className="day-label">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="productivity-report">
        <h3 className="report-title">Weekly Productivity Report</h3>
        <p className="report-week">Week - July 1st - 7th</p>
        <p className="report-user">User - Afolabi</p>
        <div className="report-divider"></div>
        <p className="report-quote">
          "You crushed it this week — consistent, focused, and organized!"
        </p>
      </div>
    </div>
  );
};

export default Progress;
