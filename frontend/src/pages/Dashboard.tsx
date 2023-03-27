import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        isDoctor: false
      });
      // hook is called when the component mounts, bcuz second argument [] is an empty array therfore the effect is only called once, when the component mounts.
      useEffect(() => {
        // get the JWT token from the localStorage object.
        const token = localStorage.getItem("token");
        // make an HTTP GET request to endpoint, passing in JWT token in the Authorization header. The axios.get method returns a promise that resolves with the response data.
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
          if (user.isDoctor) {
            navigate("/")
          } else {
            navigate("/patient-dashboard")
          }
      }, []);

      return (
        <div>
          <p></p>
        </div>
      );
}
export default Dashboard