import React from "react";
//import axios from "axios";
import "./Signup.css";

export const Signup = () => {
  return (  
    <div className="Signup">
      <div className="BoxOut bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl">
        <div className="BoxIn">
         <div className="SignupLogo"> Sign Up</div>
        <div className="userInput">
          <input className="firstName pl-3" placeholder="First Name" />
          <input className="lastName pl-3" placeholder="Last Name" />
          <input className="email pl-3" placeholder="Email" />
          <input className="phonenumber pl-3" placeholder="Phone Number" />
          <input type={"password"} className="password pl-3" placeholder="Password" />
          <input type={"password"} className="renterpassword pl-3" placeholder="Re-enter Password" />
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
