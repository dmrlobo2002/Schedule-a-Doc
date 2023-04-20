import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <div className="Home min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-white mb-8">Schedule a Doc</h1>
      <p className="text-2xl font-medium text-white mb-8">
        Welcome! Please login or sign up to view your chart.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-white text-cyan-500 py-2 px-6 rounded-md text-xl font-medium transition duration-200 hover:bg-cyan-100">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-white text-cyan-500 py-2 px-6 rounded-md text-xl font-medium transition duration-200 hover:bg-cyan-100">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
