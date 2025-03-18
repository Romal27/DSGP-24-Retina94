import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./Stage.css";

const DiabeticRetinopathy = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
  };

  // Handle Upload Button Click
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
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage(`Fundus Image: ${data.fundus_image}`);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="stage-container"> 
      <nav className="navbar">
        <div className="logo">RetinaCare</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Stage</li>
          <li>Chatbot</li>
          <li>Direction</li>
          <li>About Us</li>
        </ul>
        <div className="auth-buttons">
          <button className="signup-btn" onClick={() => window.open("/signup", "_blank")}>Sign Up</button>
          <button className="login-btn" onClick={() => window.open("/login", "_blank")}>Login</button>
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

          {/* Upload Button */}
          <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>

          {/* Show Result */}
          {message && (
            <div className="result-box">
              <p>{message}</p>
            </div>
          )}
        </div>

        {/* Sample Fundus Image */}
        <div className="sample-image-section">
          <h3>How does a Fundus Image look like?</h3>
          <img src="/image.jpg" alt="Fundus Sample" className="sample-image" />
        </div>
      </div>
    </div>
  );
};

export default DiabeticRetinopathy;
