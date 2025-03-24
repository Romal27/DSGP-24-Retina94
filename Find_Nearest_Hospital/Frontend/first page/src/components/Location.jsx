import React from "react";

// Location component now accepts imageUrl as a prop
const Location = ({ imageUrl }) => {
  return (
    <section className="hero">
      <img src={imageUrl} alt="Nearest Hospital" className="hero-image" />
      <h1>Find Nearest Hospital</h1>
    </section>
  );
};

export default Location;
