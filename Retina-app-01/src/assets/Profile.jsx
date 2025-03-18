import { useState, useEffect } from "react";
import "../assets/Profile.css";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "JohnDoe");
  const [email, setEmail] = useState(localStorage.getItem("email") || "johndoe@example.com");
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "John Doe");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "Hey there! I'm using this app.");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // Load user details from localStorage on page load
  useEffect(() => {
    setProfilePic(localStorage.getItem("profilePic") || null);
  }, []);

  // Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("bio", bio);
    localStorage.setItem("phone", phone);
    localStorage.setItem("darkMode", darkMode);
    alert("Profile updated successfully!");
  };

  // Handle Logout
  const handleLogout = () => {
    console.log("User Logged Out");
    alert("Logged out successfully!");
    localStorage.clear(); // Clears saved data on logout
    window.location.reload(); // Reload the page
  };

  return (
    <div className={`profile-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="profile-box">
        <h2 className="title">My Profile</h2>

        {/* Profile Picture Upload */}
        <div className="profile-pic-container">
          <label htmlFor="profilePicInput">
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-pic"
            />
          </label>
          <input type="file" id="profilePicInput" onChange={handleProfilePicChange} hidden />
          <p>Click to change profile picture</p>
        </div>

        {/* User Information */}
        <div className="inputGroup">
          <label className="label">Username</label>
          <input type="text" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="inputGroup">
          <label className="label">Email</label>
          <input type="email" className="inputField" value={email} disabled />
        </div>

        <div className="inputGroup">
          <label className="label">Full Name</label>
          <input type="text" className="inputField" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="inputGroup">
          <label className="label">Bio</label>
          <textarea className="inputField bioField" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="inputGroup">
          <label className="label">Phone Number</label>
          <input type="tel" className="inputField" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {/* Dark Mode Toggle */}
        <div className="toggleContainer">
          <label className="label">Dark Mode</label>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>

        {/* Save Changes Button */}
        <button className="button" onClick={handleSaveChanges}>Save Changes</button>

        {/* Logout Button */}
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
