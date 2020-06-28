import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h2>Sample App</h2>

      <ul className="nav">
        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" exact>
            Register
          </NavLink>
        </li>
      </ul>
      
    </header>
  );
};

export default Header;
