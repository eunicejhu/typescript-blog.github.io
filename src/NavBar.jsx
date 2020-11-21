import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/notifications">Notifications</Link>
    </li>
  </nav>
);

export default NavBar;
