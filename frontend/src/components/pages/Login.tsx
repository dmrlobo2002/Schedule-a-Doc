import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = () => {
 // const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6001/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        //history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="signin">
      <div className="outerBox bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl">
        <div className="innerBox">
          <div className="signinText"> Log in</div>
          <form onSubmit={handleLogin}>
            <div className="inputs">
              <input
                type="text"
                className="inEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="inPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="loginButton">LOGIN</button>
            </div>
          </form>
          <div
            className="signupMessage"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Don't have an account?
            <Link to={"/signup"}>
              <button className="signupOption"> SIGN UP</button>
            </Link>
          </div>
          <div
            className="FP"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button className="forgotPassword"> Forgot Password? </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
