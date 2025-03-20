import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import axios from "axios";
import "./Stage.css";

const DiabeticRetinopathy = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
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
      } else {
        setMessage(`Prediction: ${data.fundus_image} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="stage-container">
      <nav className="navbar">
  <div className="logo">Retina+94</div>

  <ul className="nav-links">
    <li>Home</li>
    <li>Stage</li>
    <li>Chatbot</li>
    <li>Direction</li>
    <li>About Us</li>
  </ul>

  <div className="nav-right">
    <FaUserCircle className="profile-icon" onClick={() => window.open("/profile", "_blank")} />

    <button className="signup-btn" onClick={() => window.open("/signup", "_blank")}>
      Sign Up
    </button>

    <button className="login-btn" onClick={() => window.open("/login", "_blank")}>
      Login
    </button>
  </div> 
</nav> 

      <div className="content">
        <h2 className="title">Fundus Image Identification</h2>

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
          <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>

          {message && (
            <div className="result-box">
              <p>{message}</p>
            </div>
          )}
        </div>
        <h2 className="title">How does a fundus image looks like?</h2>
        <div className="sample-image-section">
          
  <div className="doctor-fundus-container">
    <img src="/pointing.jpg" alt="Doctor pointing" className="doctor-image" />
    
    <div className="fundus-container">
      <div className="fundus-gallery">
        <img src="/fundus1.jpeg" alt="Fundus Image 1" className="fundus-image" />
        <img src="/fundus2.jpeg" alt="Fundus Image 2" className="fundus-image" />
        <img src="/fundus3.jpeg" alt="Fundus Image 3" className="fundus-image" />
        <img src="/fundus14.jpeg" alt="Fundus Image 4" className="fundus-image" />
      </div>
    </div>

  </div>


</div>

</div>

      </div>
  
  );
};

export default DiabeticRetinopathy;
