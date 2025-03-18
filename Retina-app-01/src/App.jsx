import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiabeticRetinopathy from "./assets/Stage";

import Login from "./assets/Login";
import Signup from "./assets/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiabeticRetinopathy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
