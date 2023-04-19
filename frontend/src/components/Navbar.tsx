import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar w-full fixed z-10 top-0">
      <div className="NavArea bg-gradient-to-r from-green-400 to-blue-500 shadow-lg p-4">
        <nav>
          <ul className="flex justify-between items-center">
            <li className="nav-item">
              <Link to="/" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AboutUS" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/scheduling" className="nav-bar-element text-white font-semibold text-lg hover:text-gray-200">
                Scheduling
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
