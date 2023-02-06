import React from "react";
//use <Link></Link> as you would an anchor tag <a></a> in HTML
//instead of using href='somepage' to point to which page you want to go to use 'to=/somepage'
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="NavArea">
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-bar-element">
                <div className="Element">
                  Home
                </div>
              </Link>
              <Link to="/login" className="nav-bar-element">
                <div className="Element">
                  Login
                </div> 
              </Link>
              <Link to="/signup" className="nav-bar-element">
              <div className="Element">
                Sign up
              </div>
              </Link>
              <Link to="/AboutUS" className="nav-bar-element">
                <div className="Element">
                  About Us
                </div>
                </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
//something