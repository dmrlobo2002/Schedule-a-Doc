import React from "react";
import { Link } from "react-router-dom";
import './Login.css';

export const Login = () => {
  return(
    <div className="signin">
      <div className="outerBox bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl">
        <div className="innerBox">
         <div className="signinText"> Sign in</div>  
        <div className="inputs">
          <input className="inEmail" placeholder="Email or Phone"/>
            <input type={"password"} className="inPassword" placeholder="Password" />
        </div> 
        <div style={{display:"flex", justifyContent: "center"}}>
           <button className="loginButton">LOGIN</button>         
          </div>  
          <div className="signupMessage" style={{display:"flex", justifyContent: "center"}}>
            Don't have an account? 
            <Link to={"/signup"}>
            <button className="signupOption"> SIGN UP</button>
            </Link>
            </div> 
            <div className="FP" style={{display:"flex", justifyContent: "center"}}>
            <button className="forgotPassword"> Forgot Password? </button>
            </div>  
        </div>
      </div>
    </div>
  );
  
  


};

export default Login;
