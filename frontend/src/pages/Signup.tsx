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
  isDoctor: boolean | null;
}

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reEnterPassword, setReEnterPassword] = useState<string>("");
  const [isDoctor, setIsDoctor] = useState<boolean | null>(null);

  const handleSignup = async () => {
    if (isDoctor === null) {
      alert("Please select whether you are a doctor or not.");
      return;
    }

    const data: Data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      reEnterPassword,
      isDoctor,
    };

    try {
      console.log(data);
      await axios.post("http://localhost:6001/signup", data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signup min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="outer bg-white shadow-2xl p-8 rounded-lg">
        <h1 className="signupLogo text-4xl font-bold mb-6">Sign Up</h1>
        <div className="userInput space-y-4">
          <input
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Re-enter Password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          <div className="doctorSelection mt-4 mb-6">
            <span className="text-lg font-semibold mr-4">Are you a doctor?</span>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="isDoctor"
                value="yes"
                checked={isDoctor === true}
                onChange={() => setIsDoctor(true)}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isDoctor"
                value="no"
                checked={isDoctor === false}
                onChange={() => setIsDoctor(false)}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          <button className="signupButton px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded hover:shadow-md" onClick={handleSignup}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;