import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    isDoctor: false,
    id: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
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
    }
  }, []);

  return { user, setUser };
};

export default useUser;
