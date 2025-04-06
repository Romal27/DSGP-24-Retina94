import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store session (could be token or just flag)
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
      } else {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
      }

      alert("Login successful!");
      setError("");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="loginBox">
        <h2 className="title">Login</h2>
        {error && <p className="errorMessage">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="label">Username</label>
            <input
              type="text"
              className="inputField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Password</label>
            <input
              type="password"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p className="registerText">
          Don't have an account yet?{" "}
          <Link to="/signup" className="registerLink">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
