import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const navigate =  useNavigate();
    const expectedCode = "introtosoftware@ufl.edu";
    const [email, setCode] = useState("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
      };
      const handleEmailCheck = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email === expectedCode) {
            navigate("/VerificationCode");    
          } else {
            alert("Invalid Email. Please try again.");
          }
    };
    return (
        <div className ="ForgotPassword">
            <div className="outerBox bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="innerBox">
                    <div className = "FPmessage">
                        Forgot Password
                    </div>
                    <div className = "Emailprompt">
                        Please input the email associated with your account
                    </div>
                    <form onSubmit={handleEmailCheck}>
                        <div className="inputs">
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        </div>
                            <button className="continueButton">CONTINUE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;