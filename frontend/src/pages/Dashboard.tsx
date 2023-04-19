import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import "./ToDo.css"

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    // Check if the user data has been fetched
    if (user && user.email) {
      if (user.isDoctor) {
        navigate("/");
      } else {
        navigate("/patient-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="patientbox">
      <Link to="/patient-dashboard">
         <div className="pat" style={{ display: "flex", justifyContent: "center" }}> Patient Dashboard</div>
      </Link>
      <Link to="/doctor-dashboard">
      <div className="doc"style={{ display: "flex", justifyContent: "center" }}> Doctor Dashboard</div>
      </Link>
      
    </div>
  );
};
export default Dashboard;
