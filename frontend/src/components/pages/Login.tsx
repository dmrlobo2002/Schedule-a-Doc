import React from "react";
import './Login.css';

export const Login = () => {
  return(
    <div className="Login">
      <div className="outerBox">
        <div className="innerBox">
         <div className="Signin"> Sign in</div>  
        <div className="inputs">
          <input className="email" placeholder="Email or Phone"/>
            <input className="password" placeholder="Password" />
        </div> 
        <div style={{display:"flex", justifyContent: "center"}}>
          <button className="loginButton">LOGIN</button>
          </div>  
          <div className="SignupMessage" style={{display:"flex", justifyContent: "center"}}>
            Don't have an account? 
            <button className="SignupButton"> SIGN UP</button>
            </div> 
            <div className="FP" style={{display:"flex", justifyContent: "center"}}>
            <button className="ForgotPassword"> Forgot Password? </button>
            </div>  
        </div>
      </div>
    </div>
  );
  
  


};

export default Login;
