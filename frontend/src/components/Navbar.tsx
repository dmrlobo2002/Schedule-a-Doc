import React from "react";
//use <Link></Link> as you would an anchor tag <a></a> in HTML
//instead of using href='somepage' to point to which page you want to go to use 'to=/somepage'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-bar-element">
              Home
            </Link>
            <Link to="/login" className="nav-bar-element">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
//something
