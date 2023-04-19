import { useEffect, useState } from "react";
import axios from "axios";
import SideBarD from "../components/sidebar/SideBardD";
import "./PendingRequests.css"

export const PendingRequests = () => {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    isDoctor: false
  });
  const [requests, setRequests] = useState([
    { name: 'John Smith', date: 'April 18, 2023', time: '10:30 AM' },
    { name: 'Jane Doe', date: 'April 20, 2023', time: '2:00 PM' },
    { name: 'Bob Johnson', date: 'April 22, 2023', time: '11:00 AM' },
  ]);
  const handleApprove = (name: string) => {
    alert(`Added to calendar: ${name}`);
    setRequests(requests.filter((request) => request.name !== name));
  };
  const handleDeny = (name: String) =>{
    alert(`Not added to calendar: ${name}`);
    setRequests(requests.filter((request) => request.name !== name));
  }

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
      <div className= "Title">
      <h1 style={{ display: "inline-block", flex: 1, fontSize: 20 }}>
        Pending Requests
      </h1>
      <div className="list-item">
      {requests.map(({ name, date, time }) => (
          <div key={name} className="name-box">
            <div className="Descriptor"> Name:</div>
            <div><strong>{name}</strong></div>
            <div className="Descriptor"> Date:</div>
            <div>{date}</div>
            <div className="Descriptor"> Time:</div>
            <div>{time}</div>
            <button className="Approve" onClick={() => handleApprove(name)}>Approve</button>
            <button className="Deny" onClick={() => handleDeny(name)}>Deny</button>
          </div>
        ))}
      </div>
    </div>
    </div>
    
    
  );
};

export default PendingRequests;
