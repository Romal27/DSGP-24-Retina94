import React from "react";
import "./LocationDetails.css";

const LocationDetails = ({ imageUrl }) => {
  return (
    <div className="location-container">
      <h1>Hospital Search</h1>

      {/* Display Map or Image */}
      {imageUrl && <img src={imageUrl} alt="Hospital Location" className="location-image" />}

      {/* Hospital Information */}
      <h2>Hospital Information</h2>
      <p>
        <strong>Name:</strong> City General Hospital <br />
        <strong>Address:</strong> Sri Lanka <br />
        <strong>Contact:</strong> (+94) 0123-4567 <br />
        <strong>Additional Information:</strong> Emergency services available 24/7
      </p>

      {/* Available Doctors */}
      <h2>Available Eye Doctors</h2>
      <div className="doctor-list">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="doctor-card">
            <h3>Dr. Emily Chen</h3>
            <p>Ophthalmologist</p>
            <p>Slots: 9AM, 11AM, 2PM</p>
          </div>
        ))}
      </div>

      {/* Appointment Booking */}
      <h2>Appointment Booking</h2>
<a href="https://www.doc.lk/?gad_source=1&gclid=Cj0KCQjw-e6-BhDmARIsAOxxlxU-Gbu3qy0jn1t2yN6aHZstvBY0IBFzBlFhyiMSjjcgCRPUb0ndnyIaAsXGEALw_wcB" 
   target="_blank" 
   rel="noopener noreferrer">
  <button className="book-now-btn">Book Now</button>
</a>

    </div>
  );
};

export default LocationDetails;
