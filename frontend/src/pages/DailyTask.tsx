import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/*import queryString from 'query-string';*/
import axios from "axios";
import SideBarD from "../components/sidebar/SideBardD";
import TodoList from './ToDo';
import "./ToDo.css"
//npm install query strings

export const DailyTasks = () => {
  const [selectedName, setSelectedName] = useState("");
  const scheduleData = [
    {
      time: '9:00am',
      event: 'Meeting with colleagues',
    },
    {
      time: '11:00am',
      event: 'Pediatric appointments',
    },
    {
      time: '1:00pm',
      event: 'Lunch',
    },
    {
      time: '2:00pm',
      event: 'OR Call',
    },
    {
      time: '4:00pm',
      event: 'Afternoon clinic appointments',
    },
  ];

  

  return (
    <div className = "patient">
      <SideBarD />
      <div className= "Title">
        <h1>  </h1>
        <TodoList schedule={scheduleData}/>
      </div>
     </div>
            
  );
};

export default DailyTasks;