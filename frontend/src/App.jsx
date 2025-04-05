import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StagePage from "./components/Stage";
import Chatbot from "./components/Chatbot";
import Directions from "./components/Direction";
import AboutUs from "./components/AboutUs";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Blog from "./components/Blog"; // ✅ Blog component import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stage" element={<StagePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/direction" element={<Directions />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
