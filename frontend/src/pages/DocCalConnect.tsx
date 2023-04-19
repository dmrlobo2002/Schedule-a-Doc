import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import SideBarD from "../components/sidebar/SideBardD";
import DaCalendar from "./DaCalendar";


export const DailyTasks = () => {
  const [selectedName, setSelectedName] = useState("");
  
  return (
    <div className = "TaskB">
    
      <div className= "Title">
        <h1> 
        <DaCalendar/>
        </h1>
      </div>
     </div>
            
  );
};

export default DailyTasks;