import { useState } from "react";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    console.log("Logging in with", { username, password });
    setError("");
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h2 className="title">Login</h2>
        {error && <p className="errorMessage">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Username:</label>
            <input
              type="text"
              className="inputField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password:</label>
            <input
              type="password"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
