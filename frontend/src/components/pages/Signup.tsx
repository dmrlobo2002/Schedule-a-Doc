import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  reEnterPassword: string;
}

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reEnterPassword, setReEnterPassword] = useState<string>("");

  const handleSignup = async () => {
    const data: Data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      reEnterPassword,
    };

    try {
      //make sure to remove console.log, rn it's here for debugging
      console.log(data);
      await axios.post("http://localhost:6001/signup", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <div className="outer bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl">
        <div className="inner">
          <div className="signupLogo">Sign Up</div>
          <div className="userInput">
            <input
              className="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="phonenumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="renterpassword"
              placeholder="Re-enter Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="signupButton" onClick={handleSignup}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
