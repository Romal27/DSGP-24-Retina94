import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About MediFind</h3>
          <p>Your trusted partner in finding the right healthcare services when you need them most.</p>
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/doctors">Find Doctors</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><Link to="/emergency">Emergency Care</Link></li>
            <li><Link to="/appointments">Book Appointment</Link></li>
            <li><Link to="/online-consultation">Online Consultation</Link></li>
            <li><Link to="/medical-records">Medical Records</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>📍 123 Healthcare Ave, Medical City</li>
            <li>📞 Emergency: 911</li>
            <li>📧 info@medifind.com</li>
            <li>⏰ 24/7 Support Available</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MediFind. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
