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
            <span className="user"> Doctor Name {user.firstName} {user.lastName} </span>                  
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
                        <Diversity1RoundedIcon className="icon"/>
                        <span> Patients </span>

                    </li>
                    <li className="list">
                        <SummarizeOutlinedIcon className="icon"/>
                        <span> Patient Records</span>
                    </li>
                    <li className="list">
                        <RuleRoundedIcon className="icon"/>
                        <span> Appointement Requests</span>
                    </li>
                    <p className="titleUser"> USER </p>
                    <li className="list">
                    <AccountCircleRoundedIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li className="list">
                        <InventoryRoundedIcon className="icon"/>
                        <span> Daily Tasks</span>
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