import React, { useState } from "react";
import "./PasswordReset.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const PasswordReset = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const handleNewPassword =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };
    const handleConfirmPassword =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
    const handlePasswordConfirmation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPassword === ConfirmPassword) {
            alert("Passwords match! Passwrord reset successful.");
            navigate("/");    
          } else {
            alert("Password do not match. Password reset unsuccessful.");
          }
    };
    return(
        <div className="PasswordReset">
            <div className="outerBox bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className = "PRmessage">
                        New Password
                </div>
                <div className = "NPprompt">
                        Please input your new password
                </div>
                <form onSubmit={handlePasswordConfirmation}>
                    <div className="inputs">
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={handleNewPassword}
                        />
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="Confirm Password"
                            value={ConfirmPassword}
                            onChange={handleConfirmPassword}
                        />
                    </div>
                    <button className="continueButton">CONTINUE</button>
                </form>
            </div>
        </div>
    );
};
export default PasswordReset;