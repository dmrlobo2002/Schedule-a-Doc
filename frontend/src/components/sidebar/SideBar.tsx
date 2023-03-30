import { useEffect, useState } from "react";
import axios from "axios";
import "./SideBar.css";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


export const SideBar = () => {
    
    const [user, setUser] = useState({
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        isDoctor: false
    });
    
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
      
    return(
        <div className="sidebar" >
            <div className="top">
            <span className="user"> {user.firstName} {user.lastName} </span>                  
            </div>
            <p className="title"> PATIENT </p>
            <hr/>
            <div className="center">
               <ul>
               <p className="titleUser"> MAIN </p>
                    <li className="list">
                    <Link to="/patient-dashboard">
                    <DashboardRoundedIcon className="icon"/>
                        <span> Dashboard</span>
                    </Link>
                    </li >
                    <p className="titleUser"> SERVICE </p>
                    <li className="list">
                        <SummarizeOutlinedIcon className="icon"/>
                        <span> Reports</span>
                    </li>
                    <li className="list">
                        <EventAvailableIcon className="icon"/>
                        <span> Schedule Appointment</span>
                    </li>
                    <p className="titleUser"> USER </p>
                    <li className="list">
                    <AccountCircleRoundedIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li className="list">
                        <CalendarMonthIcon className="icon"/>
                        <span> Calendar</span>
                    </li>
                </ul> 
            </div>
           
            <div className="bottom">
                 <ul>
                 <li className="list">
                    <Link to="/">
                        <LogoutRoundedIcon className="icon"/>
                            <span>Logout</span>
                    </Link>
                    </li>
                 </ul>
            </div>
        </div>
    )
}

export default SideBar