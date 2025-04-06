import React from "react";
import "./Location.css";
import hospitalImg from "../assets/hospital1.jpg"; 

const Location = () => {
  return (
    <section className="hero-section">
      <div className="hero-image">
        <img 
          src={hospitalImg} 
          alt="Find Nearest Hospital" 
        />
      </div>
      <div className="hero-content">
        <h1>Find Your Nearest Healthcare Provider</h1>
        <p>Quick access to medical care when you need it most</p>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Enter your location..."
            className="location-search"
          />
          <button className="search-button">
            Search Nearby
          </button>
        </div>
      </div>
    </section>
  );
};

export default Location;
