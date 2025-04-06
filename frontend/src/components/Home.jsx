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
          <li><Link to="/profile"><FaUser /></Link></li>
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
            "🔍 Validate Image",
            "🩺 Detect DR Stage",
            "🤖 AI Awareness Tips",
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

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Retina +94. All rights reserved.</p>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
          <div className="footer-contact">
            <p><strong>📞</strong> +94 71 123 4567</p>
            <p><strong>📧</strong> retina94@healthcare.ai</p>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </footer>
      
      <ChatWidget />
    </div>
  );
};

export default Home;
