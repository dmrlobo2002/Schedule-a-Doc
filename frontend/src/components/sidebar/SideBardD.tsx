import { useEffect, useState } from "react";
import axios from "axios";
import "./SideBar.css";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';

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
            <p className="title"> DOCTOR </p>
            <hr/>
            <div className="center">
               <ul>
               <p className="titleUser"> MAIN </p>
                    <li className="list">
                    <Link to="/doctor-dashboard">
                    <DashboardRoundedIcon className="icon"/>
                        <span> Dashboard</span>
                    </Link>
                    </li >
                    <li className="list">
                    <Link to="/PatientRecords">
                        <Diversity1RoundedIcon className="icon"/>
                        <span> Patients </span>
                     </Link>

                    </li>
                    
                   
                    <li className="list">
                    <Link to="/PendingRequests">
                        <RuleRoundedIcon className="icon"/>
                            <span> Appointment Requests</span>
                    </Link>
                    </li>
                    <p className="titleUser"> USER </p>
                    <li className="list">
                    <Link to="/doctorInfo">
                        <AccountCircleRoundedIcon className="icon"/>
                            <span>Profile</span>
                    </Link>
                    </li>
                    <li className="list">
                        <Link to="/DailyTasks">
                            <InventoryRoundedIcon className="icon"/>
                            <span> Daily Tasks</span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/DaCalendar">
                            <CalendarMonthIcon className="icon"/>
                                <span> Calendar</span>
                        </Link>
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

/*<li className="list">
                    <Link to="/PatientRecords">
                        <SummarizeOutlinedIcon className="icon"/>
                        <span> Patient Records</span>
                    </Link>
                    </li>*/