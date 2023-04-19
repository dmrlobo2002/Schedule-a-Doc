import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/sidebar/SideBar";
import PatientWidgets from "../components/widgets/PatientWidgets";
import "./PatientDashboard";




export const PatientDashboard = () => {
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
      <SideBar />
      <div className= "pside">
        <div className="pwidget">
         
      </div>
    
      </div> 
    </div>
    
    
  );
};

export default PatientDashboard
/*<main className="text-center p-5">
        <section>
            <div className="">
                <h2 className="py-5 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                    Welcome, <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{user.firstName} {user.lastName}</span>, to your {user.isDoctor ? "Doctor" : "Patient"} Dashboard
                </h2>
            </div>
        </section>
    </main>*/