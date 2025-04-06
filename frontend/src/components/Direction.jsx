import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLocationArrow,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Direction.css";

const Directions = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchHospitals = () => {
    setLoading(true);
    setErrorMsg("");
    setHospitals([]);
    setSelectedHospital(null);
    setDoctors([]);

    fetch("http://localhost:5001/nearest-hospitals")
      .then((res) => res.json())
      .then((data) => {
        if (data.nearest_hospitals) {
          setHospitals(data.nearest_hospitals);
        } else {
          setErrorMsg("⚠ Unable to retrieve hospitals.");
        }
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setErrorMsg("❌ Failed to fetch hospitals.");
      })
      .finally(() => setLoading(false));
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setDoctors([]);

    fetch(`http://localhost:5000/hospital-doctors/${hospital.hospital_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.doctors) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  };

  return (
    <div className="page-wrapper">
      <div className="directions-main">
        {/* Navbar */}
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

        {/* Hero Section */}
        <motion.section
          className="hero-section small"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        
          <button className="get-location-btn" onClick={fetchHospitals}>
            <FaLocationArrow /> Get My Location & Nearby Hospitals
          </button>
        </motion.section>

        {/* Hospital List */}
        <motion.div
          className="hospital-list-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Available Hospitals</h2>

          {loading && <p className="loading-text">📡 Fetching nearby hospitals...</p>}
          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <ul className="hospital-list">
            {hospitals.map((hospital, index) => (
              <li
                key={index}
                className={`hospital-item ${selectedHospital?.hospital_id === hospital.hospital_id ? "active" : ""}`}
                onClick={() => handleHospitalClick(hospital)}
              >
                <span>{hospital.name} - {hospital.distance_km} km</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-button"
                >
                  Location
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Doctors Section */}
        {selectedHospital && (
          <motion.div
            className="doctor-details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Doctors at {selectedHospital.name}</h3>
            <div className="doctor-grid">
              {doctors.length === 0 ? (
                <p>No doctors available.</p>
              ) : (
                doctors.map((doctor, index) => (
                  <div key={index} className="doctor-card">
                    <h4>{doctor.name}</h4>
                    <p>{doctor.specialization}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* DOC990 Box */}
        <motion.div
          className="doc990-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            Need to book an appointment? Visit{" "}
            <a
              href="https://www.doc.lk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOC990
            </a>{" "}
            for quick and easy scheduling.
          </p>
        </motion.div>
      </div>

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

export default Directions;
