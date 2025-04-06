import React from "react";
import { motion } from "framer-motion";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import {
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
  FaRobot
} from "react-icons/fa";
import RomalImg from "../assets/romal.jpeg";
import HirushiImg from "../assets/hirushi.jpg";
import TeranImg from "../assets/teran.jpg";
import ThiviruImg from "../assets/thiviru.jpg";

const AboutUs = () => {
  const teamMembers = [
    { id: 1, name: "Romal", role: "AI Engineer", image: RomalImg },
    { id: 2, name: "Hirushi", role: "ML Engineer", image: HirushiImg },
    { id: 3, name: "Teran", role: "ML Engineer", image: TeranImg },
    { id: 4, name: "Thiviru", role: "AI Engineer", image: ThiviruImg },
  ];
  
  return (
    <div className="about-container">
      <nav className="navbar">
  <div className="logo">Retina +94</div>
  <ul className="nav-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/stage">Stage</Link></li>
    <li><Link to="/chatbot">Chatbot</Link></li>
    <li><Link to="/direction">Direction</Link></li>
    <li><Link to="/blog">Blog</Link></li> 
    <li><Link to="/aboutus">About Us</Link></li>
   
  </ul>
  <div className="auth-buttons">
    <Link to="/login" className="btn">Login</Link>
    <Link to="/signup" className="btn btn-signup">Sign Up</Link>
  </div>
</nav>


      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      
        <h1>
          Welcome to <span className="highlight">Retina +94</span> — where
          technology meets healthcare to safeguard vision and transform lives.
        </h1>
      </motion.section>

      <motion.section
        className="about-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to make advanced diabetic retinopathy detection
          accessible to all. By leveraging AI technology, we aim to prevent
          vision loss through timely and accurate diagnosis.
        </p>
      </motion.section>

      <section className="about-features">
        {[
          {
            icon: <GiArtificialIntelligence className="feature-icon" />,
            title: "DR Stage Detection",
            desc: "Our models analyze fundus images with high accuracy.",
          },
          {
            icon: <FaHeart className="feature-icon" />,
            title: "Tracking Hospitals",
            desc: "Guiding user to the nearest hospital",
          },
          {
            icon: <FaRobot className="feature-icon" />,
            title: "Smart Chatbot",
            desc: "Receive recommendations and insights through AI chat.",
          },
        ].map((feature, idx) => (
          <motion.div
            className="feature-card"
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      <motion.section
        className="team-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>👩‍💻 Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <motion.div
              className="team-member"
              key={member.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="member-avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="contact-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>📞 Get in Touch</h2>
        <p>We’d love to hear from you!</p>
        <div className="contact-info">
          <p>
            <FaEnvelope className="contact-icon" />{" "}
            <a href="mailto:info@retinaplus94.com">info@retinaplus94.com</a>
          </p>
          <p>
            <FaPhoneAlt className="contact-icon" /> Phone: +94 123 456 789
          </p>
        </div>
      </motion.section>

      <footer className="enhanced-footer">
  <div className="footer-columns">
    <div className="footer-logo">
      <h2>Retina +94</h2>
      <p>Empowering DR detection with AI</p>
    </div>

    <div className="footer-column">
      <h4>Upcoming Versions</h4>
      <ul>
        <li><a href="#">Android</a></li>
        <li><a href="#">iOS</a></li>
        <li><a href="#">Web App</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <a href="https://facebook.com"><FaFacebookF /></a>
        <a href="https://twitter.com"><FaTwitter /></a>
        <a href="https://instagram.com"><FaInstagram /></a>
        <a href="https://linkedin.com"><FaLinkedinIn /></a>
      </div>
    </div>

    <div className="footer-column">
      <h4>Company</h4>
      <ul>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Use</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2025 Retina +94. All rights reserved. | A VisionCare AI Initiative</p>
  </div>
</footer>

    </div>
  );
};

export default AboutUs;
