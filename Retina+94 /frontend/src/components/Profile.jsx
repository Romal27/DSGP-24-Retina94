import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🔁 for redirect
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const navigate = useNavigate();

  const storedUsername =
    localStorage.getItem("username") || sessionStorage.getItem("username");

  useEffect(() => {
    if (!storedUsername) {
      // 🔁 Redirect if not logged in
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/users/profile/${storedUsername}`
        );
        const data = await response.json();

        if (response.ok) {
          setUsername(data.username);
          setOriginalUsername(data.username);
          setEmail(data.email);
        } else {
          console.error("Profile fetch failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [storedUsername, navigate]);

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/users/profile/${originalUsername}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        localStorage.setItem("username", username);
        sessionStorage.setItem("username", username);
        setOriginalUsername(username);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Update failed.");
      console.error("Update error:", error);
    }
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="title">My Profile</h2>

        <div className="profile-pic-container">
          <FaUserCircle className="default-profile-icon" />
        </div>

        <div className="inputGroup">
          <label className="label">Username</label>
          <input
            type="text"
            className="inputField"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label className="label">Email</label>
          <input type="email" className="inputField" value={email} disabled />
        </div>

        <button className="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
