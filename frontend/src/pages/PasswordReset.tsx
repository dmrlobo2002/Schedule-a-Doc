import React, { useState } from "react";
import "./PasswordReset.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const PasswordReset = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:6001/PasswordReset", {
                newPassword,ConfirmPassword
              });
        }
        catch (error) {
            console.error(error);
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
                <form onSubmit={handleNewPassword}>
                    <div className="inputs">
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            className="inEmail"
                            placeholder="Confirm Password"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Link to={"/"}>
                        <button className="continueButton">CONTINUE</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
export default PasswordReset;