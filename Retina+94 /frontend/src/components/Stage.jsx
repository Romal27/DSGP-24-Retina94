import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./Stage.css";
import {
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

import pointing from "../assets/pointing.jpg";
import fundus1 from "../assets/image.jpg";
import fundus2 from "../assets/fundus2.jpeg";
import fundus3 from "../assets/fundus3.jpeg";
import fundus4 from "../assets/fundus4.jpeg";
import ChatWidget from '../components/ChatWidget';

const StagePage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fundusConfirmed, setFundusConfirmed] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setFundusConfirmed(false);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      if (data.error) {
        setMessage(`Error: ${data.error}`);
        setFundusConfirmed(false);
      } else {
        setMessage(`Prediction: ${data.fundus_image} `);
        setFundusConfirmed(data.fundus_image === "Fundus");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      setFundusConfirmed(false);
    }

    setLoading(false);
  };

  const handleAnalyzeStage = async () => {
    if (!selectedFile || !fundusConfirmed) {
      setMessage("Please upload and confirm a fundus image first.");
      return;
    }

    setLoading(true);
    setMessage("Analyzing DR stage...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_dr_stage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      if (data.error) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage(`${data.message}`);
      }
    } catch (error) {
      setMessage("Error connecting to the DR analysis server.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="stage-container">
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

        <motion.div
          className="content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="title">Diabetic Retinopathy Stage Identification</h2>

          <motion.div
            className="upload-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <label htmlFor="file-upload" className="upload-box">
              {image ? (
                <img src={image} alt="Uploaded" className="uploaded-image" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📸</span>
                  <p>Click to upload a fundus image</p>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />

            <div className="button-group">
              <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || loading}>
                {loading ? "Uploading..." : "Upload"}
              </button>
              <button className="upload-btn analyze-btn" onClick={handleAnalyzeStage} disabled={!fundusConfirmed || loading}>
                {loading ? "Analyzing..." : "Analyze Stage"}
              </button>
            </div>

            {message && <div className="result-box"><p>{message}</p></div>}
          </motion.div>

          <motion.h2
            className="title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How does a fundus image look like?
          </motion.h2>

          <motion.div
            className="sample-image-section"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="doctor-fundus-container">
              <img src={pointing} alt="Doctor pointing" className="doctor-image" />
              <div className="fundus-container">
                <div className="fundus-gallery">
                  {[fundus1, fundus2, fundus3, fundus4].map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img}
                      alt={`Fundus ${idx + 1}`}
                      className="fundus-image"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

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

    
      <ChatWidget />
    </>
  );
};

export default StagePage;
