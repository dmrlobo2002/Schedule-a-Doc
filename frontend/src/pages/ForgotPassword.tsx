import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const navigate =  useNavigate();
    const [email, setEmail] = useState("");
    const handleFP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:6001/ForgotPassword", {
              email,
            });
            if (response.status === 200) {
              localStorage.setItem("token", response.data.token);
              navigate("/VerificationCode");
            }
          } catch (error) {
            console.error(error);
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
                    <form onSubmit={handleFP}>
                        <div className="inputs">
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                            <Link to={"/VerificationCode"}>
                                <button className="continueButton">CONTINUE</button>
                            </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ForgotPassword;