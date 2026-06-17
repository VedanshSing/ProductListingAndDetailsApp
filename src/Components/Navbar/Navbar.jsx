import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaShoppingCart,
  FaGlobe,
  FaUser,
  FaSearch,
} from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onMenuClick = () => {
    if (location.pathname === "/filter") {
      navigate("/");
    } else {
      navigate("/filter");
    }
  };

  return (
    <nav className="customNavbar">
      <div className="menu-icon">
        <FaBars className="menu-icon" onClick={onMenuClick} />
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
      </div>

      <div className="nav-icons">
        <FaShoppingCart />
        <FaGlobe />
        <FaUser />
      </div>
    </nav>
  );
};

export default Navbar;