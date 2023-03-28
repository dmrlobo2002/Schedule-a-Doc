import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";

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
    <div>
      <p></p>
    </div>
  );
};
export default Dashboard;
