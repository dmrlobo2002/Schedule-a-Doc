import React from "react";
//import axios from "axios";
import "./Signup.css";

export const Signup = () => {
  return (  
    <div className="signup">
      <div className="outer bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl">
        <div className="inner">
         <div className="signupLogo"> Sign Up</div>
        <div className="userInput">
          <input className="firstName" placeholder="First Name" />
          <input className="lastName" placeholder="Last Name" />
          <input className="email" placeholder="Email" />
          <input className="phonenumber" placeholder="Phone Number" />
          <input type={"password"} className="password" placeholder="Password" />
          <input type={"password"} className="renterpassword" placeholder="Re-enter Password" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="signupButton">SIGN UP</button>
        </div> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
