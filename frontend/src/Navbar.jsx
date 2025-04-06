// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../assets/logo.jpg';  // Path to your logo image

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="MediFind Logo" />
        </Link>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stage">Stage</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
          <li><Link to="/direction">Direction</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li>
            <button className="sign-in-button">Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
