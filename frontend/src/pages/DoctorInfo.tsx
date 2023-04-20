import { useEffect, useState } from "react";
import axios from "axios";
import image from "./doctor.jpg";
import "./DoctorInfo.css";
import { useNavigate } from "react-router-dom";
import SideBarD from "../components/sidebar/SideBardD";

export const DoctorInfo = () => {
  const navigate =  useNavigate();
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    isDoctor: false
  });
  const NavigateToPatients = async () => {
    navigate("/PatientRecords"); 
  };
  const NavigateToDailyTasks = async () =>{
    navigate("/DailyTasks");
  };
  const NavigateToPendingRequests= async () =>{
    navigate("/PendingRequests");
  };
  const NavigateToCalendar= async () =>{
    navigate("/DaCalendar");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:6001/user-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className = "patient">
      <SideBarD />
      <div className="name"> 
      <div className="welcome">
        Welcome, Dr. Valderrama
      </div>
        <img className="doctorPic" src={image}>
        </img>
        <div className="information">
          Number of Patients: 52
          <button className="viewPatients" onClick={NavigateToPatients}><div className="Textinside">
            View Patients
            </div>
            </button>
        </div>
        <div className="information">
          Patients to see today: 5
          <button className="viewPatients" onClick={NavigateToDailyTasks}><div className="Textinside">
            View Tasks
            </div>
            </button>
        </div>
        <div className="information">
          Pending Appointment Requests: 3
          <button className="viewPatients" onClick={NavigateToPendingRequests}><div className="Textinside">
            View Requests
            </div>
            </button>
        </div>
        <div className="information">
          Number of Years of experience: 8
        </div>
        <div className="information">
          Calendar Spaces Open today: 2
          <button className="viewPatients" onClick={NavigateToCalendar}><div className="Textinside">
            View Calendar
            </div>
            </button>
        </div>
        </div>
    </div> 
    
    
  );
};

export default DoctorInfo;
