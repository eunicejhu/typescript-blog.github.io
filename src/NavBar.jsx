import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/cats">Cats</Link>
    </li>
  </nav>
);

export default NavBar;
