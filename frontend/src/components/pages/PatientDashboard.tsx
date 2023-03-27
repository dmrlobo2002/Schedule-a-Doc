import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      <p>Is doctor: {user.isDoctor ? "Yes" : "No"}</p>
    </div>
  );
};

export default PatientDashboard
