import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

export const Signup = () => {
  return (
    <div className="Signup">
      <div className="Area">
        <div className="SignupLogo"> Sign Up</div>
        <div className="userInput">
          <input className="firstName" placeholder="First Name" />
          <input className="lastName" placeholder="Last Name" />
          <input className="email" placeholder="Email" />
          <input className="phonenumber" placeholder="Phone Number" />
          <input className="password" placeholder="Password" />
          <input className="renterpassword" placeholder="Re-enter Password" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="signupButton">SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
