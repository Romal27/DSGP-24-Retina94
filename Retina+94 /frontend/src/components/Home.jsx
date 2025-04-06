import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaRobot,
  FaEye,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import ChatWidget from "../components/ChatWidget";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
              <div className="logo">Retina +94</div>
              <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/stage">Stage</Link></li>
  <li><Link to="/chatbot">Chatbot</Link></li>
  <li><Link to="/direction">Direction</Link></li>
  <li><Link to="/blog">Blog</Link></li>
  <li><Link to="/aboutus">About Us</Link></li>
  <li><Link to="/profile">Profile</Link></li>
</ul>

              <div className="auth-buttons">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/signup" className="btn btn-signup">Sign Up</Link>
              </div>
            </nav>

      <section className="hero-section">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>See Clearly. Live Fully.</h1>
          <p>
            Empowering vision care with <span className="highlight">AI-driven diagnosis</span> and awareness for Diabetic Retinopathy.
          </p>
          <Link to="/stage" className="btn btn-primary">Start Detection</Link>
        </motion.div>
      </section>

      <section className="timeline-section">
        <h2>How It Works</h2>
        <div className="timeline">
          {[
            "📤 Upload Fundus Image",
            "🔍 Validating the Image",
            "🩺 Detecting DR Stage",
            "🤖 Awareness Tips with the Chatbot",
            "👨‍⚕️ Find a Hospital & Specialists",
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="timeline-step"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="icon">{step.split(" ")[0]}</div>
              <p>{step.split(" ").slice(1).join(" ")}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">🔮 Our Key Features</h2>
        <motion.div
          className="features-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            {
              icon: <GiArtificialIntelligence className="feature-icon" />,
              title: "DR Stage Diagnosis",
              desc: "Get fast, reliable DR stage detection from your image.",
            },
            {
              icon: <FaRobot className="feature-icon" />,
              title: "Friendly Chatbot",
              desc: "Ask questions and get support 24/7, instantly.",
            },
            {
              icon: <FaEye className="feature-icon" />,
              title: "Eye Care Tracker",
              desc: "FInd the nearest eye care hospital with the specialists",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-block"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="testimonials-section">
        <h2>User Feedback</h2>
        <motion.div
          className="testimonial-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>“Retina+94 made stage detection easy and stress-free. Informative and User-friendly”</p>
          <h4>- Dr. Perera, Ophthalmologist</h4>
        </motion.div>
      </section>

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

      <ChatWidget />
    </div>
  );
};

export default Home;
