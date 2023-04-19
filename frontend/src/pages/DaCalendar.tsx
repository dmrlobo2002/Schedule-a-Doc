import React, { useState } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import SideBarD from "../components/sidebar/SideBardD";

import './DaCalendar.css'

interface IAppState {
    events: {
      date: Date;
      title: string;
    }[];
  }
  
  const PaCalendar: React.FC = () => {
    const [state, setState] = useState<IAppState>({
      events: [],
    });
  
    const handleDateClick = (date: Date) => {
      const title = prompt('Enter event title:');
      if (title) {
        setState({
          events: [
            ...state.events,
            {
              date,
              title,
            },
          ],
        });
      }
    };
  
    const tileContent = ({ date, view }: any) => {
      if (view === 'month') {
        const event = state.events.find((event) => {
          return (
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
          );
        });
        if (event) {
          return <p>{event.title}</p>;
        }
      }
    };
  
    return (
     
      <div className="DaCalendar" >
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        className="calendar"
      />
      
       <div className="back">
               <ul>
               <li className="list2">
                  <Link to="/doctor-dashboard">
                          <span>BACK</span>
                  </Link>
                  </li>
               </ul>
          </div> 
    </div>
      
     
      
    );
  };

  export default PaCalendar;