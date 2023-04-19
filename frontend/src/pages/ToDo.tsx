
import React from 'react';
import "./ToDo.css"


type ScheduleItem = {
  time: string;
  event: string;
};

type DailyScheduleProps = {
  schedule: ScheduleItem[];
};

const TodoList: React.FC<DailyScheduleProps> = ({ schedule }) => {
  return (
    <div className="daily-schedule">
      <div className="daily-schedule-header">
        <h2 className="daily-schedule-title">Today's Schedule</h2>
        <div className="daily-schedule-date">{new Date().toLocaleDateString()}</div>
      </div>
      <div className="daily-schedule-body">
        {schedule.map((item) => (
          <div key={item.time} className="daily-schedule-item">
            <div className="daily-schedule-time">{item.time}</div>
            <div className="daily-schedule-event">{item.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;