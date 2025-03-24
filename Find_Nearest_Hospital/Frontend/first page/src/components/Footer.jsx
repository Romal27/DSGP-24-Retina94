import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="glassy-footer">
      <div className="footer-content">
        <h2>Vision Care Center</h2>
        <p>Your Trusted Eye Care Partner</p>
      </div>

      <div className="footer-links">
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        <a href="#">FAQs</a>
      </div>

      <div className="social-icons">
        <a href="#" className="social-link">🔗 X</a>
        <a href="#" className="social-link">📸 Instagram</a>
        <a href="#" className="social-link">📹 YouTube</a>
        <a href="#" className="social-link">💼 LinkedIn</a>
      </div>

      <p className="footer-note">© {new Date().getFullYear()} Vision Care Center. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
