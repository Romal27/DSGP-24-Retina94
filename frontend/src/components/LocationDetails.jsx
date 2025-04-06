import React, { useState } from "react";
import "./LocationDetails.css";
import { FaMapMarkerAlt, FaPhone, FaAmbulance, FaClock } from "react-icons/fa";

const LocationDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      name: "Central City Hospital",
      distance: "0.5 km",
      address: "123 Healthcare Ave, Medical City",
      phone: "+1 234-567-8900",
      emergency: "Available",
      hours: "24/7",
      image: "hospital1.jpg",
    },
  ];

  return (
    <div className="location-details-container">
     
      <section className="hero-section">
        <h1>🏥 Find Nearby Hospitals</h1>
        <p>Quick access to top-rated hospitals in your area.</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your location or zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>Search</button>
        </div>
      </section>

      <div className="results-section">
        {hospitals.map((hospital, index) => (
          <div key={index} className="hospital-card">
            <div className="hospital-info">
              <h2>{hospital.name}</h2>
              <p className="distance">{hospital.distance}</p>
              <div className="info-grid">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span>{hospital.address}</span>
                </div>
                <div className="info-item">
                  <FaPhone />
                  <span>{hospital.phone}</span>
                </div>
                <div className="info-item">
                  <FaAmbulance />
                  <span>{hospital.emergency}</span>
                </div>
                <div className="info-item">
                  <FaClock />
                  <span>{hospital.hours}</span>
                </div>
              </div>
              <div className="action-buttons">
                <button className="primary-button">Get Directions</button>
                <button className="secondary-button">More Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Retina +94. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LocationDetails;
