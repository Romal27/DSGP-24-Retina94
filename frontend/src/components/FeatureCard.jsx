import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ title, description, buttonLabel, icon, onClick }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h2 className="feature-title">{title}</h2>
    <p className="feature-description">{description}</p>
    {buttonLabel && (
      <button className="feature-button" onClick={onClick}>
        {buttonLabel} <span className="button-arrow">→</span>
      </button>
    )}
  </div>
);

export default FeatureCard;
