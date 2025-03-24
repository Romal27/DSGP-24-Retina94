// src/components/Navbar.jsx
import React from "react";
import './Navbar.css';
import logo from '../assets/logo.jpg';  // Path to your logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
        <li><button>Sign Out</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
