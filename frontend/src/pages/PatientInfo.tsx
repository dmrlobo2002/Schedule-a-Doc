import { useEffect, useState } from "react";
import axios from "axios";
import SideBarD from "../components/sidebar/SideBardD";

export const PatientInfo = () => {
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

  return (
    <div className = "patient">
        <h1>Hello, Patient Info</h1>
      <SideBarD />
      <div className= "pside">
        <div className="pwidget">
         
      </div>
      </div> 
    </div>
    
    
  );
};
export default PatientInfo;
