import "./VerificationCode.css"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const VerificationCode = () =>{
    const navigate =  useNavigate();
    const [verificationNumber, setVerificationNumber] = useState("");
    const handleVC = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:6001/VerificationCode", {
              verificationNumber,
            });
            if(verificationNumber === "123"){
                navigate("/passwordReset");
            }
        }
        catch (error) {
            console.error(error);
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
                    <form onSubmit={handleVC}>
                    <div className="inputs">
                        <input
                            type="text"
                            className="inVC"
                            placeholder="Verification Code"
                            value={verificationNumber}
                            onChange={(e) => setVerificationNumber(e.target.value)}
                        />
                        </div>
                        <Link to={"/PasswordReset"}>
                            <button className="continueButton">CONTINUE</button>
                        </Link>      
                    </form>
                </div>
            </div>
        </div>
    )
};
export default VerificationCode;