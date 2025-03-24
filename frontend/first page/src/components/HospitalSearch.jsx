import React from "react";
import FeatureCard from "./FeatureCard";
import hospitalImage from "../assets/hospital.jpg";
import eyeImage from "../assets/eye.jpg";

const HospitalSearch = () => {
  return (
    <div className="hospital-search-container">
      <h1>Hospital Search</h1>

      {/* Feature Cards */}
      <FeatureCard
        title="Find Nearest Hospital"
        description="Stay informed with real-time location tracking, ensuring you find the nearest hospital swiftly and efficiently."
        imageUrl={hospitalImage}
        buttonText="Try Now"
        buttonLink="/location"
      />

      <FeatureCard
        title="Find Doctor Details"
        description="When you find the closest hospital, you don’t need to go to a separate platform."
        imageUrl={eyeImage}
        buttonText="Try Now"
        buttonLink="/location"
      />
    </div>
  );
};

export default HospitalSearch;
