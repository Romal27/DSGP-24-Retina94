import React, { useState } from "react";
import "./Stage.css";

const DiabeticRetinopathy = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Stage</li>
          <li>Chatbot</li>
          <li>Direction</li>
          <li>About Us</li>
        </ul>
        <div className="auth-buttons">
          <button className="signup-btn">SignUp</button>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h2 className="title">Diabetic Retinopathy Stage Identification</h2>

        {/* Image Upload Section */}
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-box">
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-image" />
            ) : (
              <div className="upload-placeholder">
                <span className="upload-icon">⬆️</span>
                <p>Please Upload the Fundus Image Here</p>
              </div>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          <button className="submit-btn">Submit</button>
        </div>

        {/* Sample Fundus Image */}
        <div className="sample-image-section">
          <h3>How does a Fundus Image look like?</h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Fundus_photograph_of_normal_left_eye.jpg"
            alt="Fundus Sample"
            className="sample-image"
          />
        </div>

        {/* Diabetic Retinopathy Stage Result */}
        <div className="result-section">
          <h3 className="result-title">The Diabetic Retinopathy Stage</h3>
          <button className="stage-btn">Stage</button>
        </div>
      </div>
    </div>
  );
};

export default DiabeticRetinopathy;
