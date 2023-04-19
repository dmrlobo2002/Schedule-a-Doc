import "./VerificationCode.css"
import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const VerificationCode = () =>{
    const navigate =  useNavigate();
    const expectedCode = 1234;
    const [code, setCode] = useState("");
    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
      };
    
    const handleVerificationCheck = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (code === expectedCode.toString()) {
            alert("Verification successful!");
            navigate("/PasswordReset");    
          } else {
            alert("Verification failed. Please try again.");
          }
    };
    return (
        <div className ="VerificationCode">
            <div className="outerBox bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="inner">
                    <div className = "VCmessage">
                    Verification Code
                    </div>
                    <div className = "vcprompt">
                    Please input the verification code given to you
                    </div>
                    <form onSubmit={handleVerificationCheck}>
                    <div className="inputs">
                        <input
                            type="text"
                            className="inVC"
                            placeholder="Verification Code"
                            value={code}
                            onChange={handleCodeChange}
                        />
                        </div>
                        <button className = "continueButton" type="submit">CONTINUE</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default VerificationCode;