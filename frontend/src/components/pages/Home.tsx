import React from "react";
import "./Home.css";

export const home = () => {
  return (
    <div className="Home">
      <div className="Area">
        <div className="HomeLogo"> Home</div>
        <div className="WelcomeMessage">
          Welcome to schedule a doc please login or sign up to view your chart
        </div>
      </div>
    </div>
  );
};
export default home;
