import React, { useState } from "react";
import "./Stage.css";

const DiabeticRetinopathy = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setPrediction(""); // Reset prediction when new image is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setPrediction("Please select an image first.");
      return;
    }

    setLoading(true);
    setPrediction("Processing...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setPrediction(`Error: ${data.error}`);
      } else {
        setPrediction(`Diabetic Retinopathy Stage: ${data.prediction}`);
      }
    } catch (error) {
      setPrediction("Error connecting to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">RetinaCare</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Stage</li>
          <li>Chatbot</li>
          <li>Direction</li>
          <li>About Us</li>
        </ul>
      </nav>

      <div className="content">
        <h2 className="title">Diabetic Retinopathy Stage Identification</h2>

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
            {loading ? "Processing..." : "Upload & Predict"}
          </button>

          {prediction && (
            <div className="result-box">
              <p>{prediction}</p>
            </div>
          )}
        </div>

        <div className="sample-image-section">
          <h3>How does a Fundus Image look like?</h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Fundus_photograph_of_normal_left_eye.jpg"
            alt="Fundus Sample"
            className="sample-image"
          />
        </div>
      </div>
    </div>
  );
};

export default DiabeticRetinopathy;
