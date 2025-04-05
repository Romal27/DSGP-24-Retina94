import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaHeart, FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  const teamMembers = [
    { id: 1, name: "Romal", role: "AI Engineer", initials: "RL" },
    { id: 2, name: "Hirushi", role: "ML Engineer", initials: "HA" },
    { id: 3, name: "Teran", role: "ML Engineer", initials: "TS" },
    { id: 4, name: "Thiviru", role: "AI Engineer", initials: "TW" },
  ];

  return (
    <div className="about-container">
      {/* Reused Navbar from Home */}
      <nav className="navbar">
  <div className="logo">Retina +94</div>
  <ul className="nav-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/stage">Stage</Link></li>
    <li><Link to="/chatbot">Chatbot</Link></li>
    <li><Link to="/direction">Direction</Link></li>
    <li><Link to="/blog">Blog</Link></li> {/* ✅ Added this line */}
    <li><Link to="/aboutus">About Us</Link></li>
    <li><Link to="/profile"><FaUser /></Link></li>
  </ul>
  <div className="auth-buttons">
    <Link to="/login" className="btn">Login</Link>
    <Link to="/signup" className="btn btn-signup">Sign Up</Link>
  </div>
</nav>


      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>🚀 Empowering Vision with AI</h1>
        <p>
          Welcome to <span className="highlight">Retina +94</span> — where
          technology meets healthcare to safeguard vision and transform lives.
        </p>
      </motion.section>

      {/* Mission Section */}
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

      {/* Features Section */}
      <section className="about-features">
        {[
          {
            icon: <GiArtificialIntelligence className="feature-icon" />,
            title: "AI-Powered Detection",
            desc: "Our models analyze fundus images with high accuracy.",
          },
          {
            icon: <FaHeart className="feature-icon" />,
            title: "Early Diagnosis",
            desc: "Detect diabetic retinopathy at its earliest stages.",
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

      {/* Team Section */}
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

      {/* Contact Section */}
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Retina +94. All rights reserved.</p>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
