import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../hooks/useUser";

const Scheduling = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // Check if the user data has been fetched
    console.log(user);
    if (user && user.email) {
      if (user.isDoctor) {
        navigate("/DoctorScheduling");
      } else {
        navigate("/PatientScheduling");
      }
    } 
    // else {
    //   navigate("/signup")
    // }
  }, [user, navigate]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Scheduling;
