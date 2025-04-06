import React from "react";
import FeatureCard from "./FeatureCard";
import "./HospitalSearch.css";

const HospitalSearch = ({ navigateTo }) => {
  return (
    <div className="hospital-search-container">
      <section className="hero-section">
        <h1>🏥 Explore Healthcare Options Near You</h1>
        <p>Find hospitals and doctors in your vicinity with ease.</p>
      </section>

      <section className="features-section">
        <div className="feature-grid">
          <FeatureCard
            title="Find Nearest Hospital"
            description="Real-time location tracking to find hospitals."
            buttonLabel="Explore Now"
            icon="🏥"
            onClick={() => navigateTo('location')}
          />
          <FeatureCard
            title="Find Doctor Details"
            description="Information about nearby doctors."
            buttonLabel="Discover More"
            icon="👨‍⚕️"
            onClick={() => navigateTo('details')}
          />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Retina +94. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HospitalSearch;
