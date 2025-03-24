import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeatureCard.css";
import"./LocationDetails.jsx";


const FeatureCard = ({ title, description, buttonLabel, linkTo }) => {
  const navigate = useNavigate();

  return (
    <div className="feature-card">
      <h2>{title}</h2>
      <p>{description}</p>
      {buttonLabel && linkTo && (
        //butun click and load to LocationDetails and Hospital serach page 
        <button className="try-now-btn" onClick={() => navigate(linkTo)}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default FeatureCard;
