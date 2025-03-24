npm run dev
import React from "react";
import Navbar from "./components/Navbar";
import LocationDetails from "./components/LocationDetails";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
import Location from "./components/Location";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Import images
import hospitalImage from './assets/hospital.jpg';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Location imageUrl={hospitalImage} />

      {/* Feature Cards Section */}
      <div>
        <FeatureCard 
          title="Find Nearest Hospital" 
          description="Stay informed with real-time location tracking, ensuring you find the nearest hospital swiftly and efficiently."
          buttonLabel="Try Now"
          linkTo="/hospital-search"
        />
        <FeatureCard 
          title="Find Doctor Details" 
          description="When you find the closest hospital, you don’t need to go to a separate platform."
          buttonLabel="Try Now"
          linkTo="/hospital-search"
        />
      </div>

      <Routes>
        {/* Hospital Search Page */}
        <Route path="/hospital-search" element={<LocationDetails imageUrl={hospitalImage} />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;
