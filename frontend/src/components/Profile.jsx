import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [bio, setBio] = useState("");

  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    setProfilePic(storedProfilePic && storedProfilePic !== "null" ? storedProfilePic : null);
    setUsername(localStorage.getItem("username") || "TeranSen");
    setEmail(localStorage.getItem("email") || "romal@example.com");
    setBio(localStorage.getItem("bio") || "Hey there! I'm using this app.");
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("bio", bio);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    console.log("User Logged Out");
    alert("Logged out successfully!");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2 className="title">My Profile</h2>

        <div className="profile-pic-container">
          <label htmlFor="profilePicInput">
            {profilePic && profilePic !== "null" ? (
              <img src={profilePic} alt="Profile" className="profile-pic" />
            ) : (
              <FaUserCircle className="default-profile-icon" />
            )}
          </label>
          <input type="file" id="profilePicInput" onChange={handleProfilePicChange} hidden />
          <p>Click to change profile picture</p>
        </div>

        <div className="inputGroup">
          <label className="label">Username</label>
          <input type="text" className="inputField" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="inputGroup">
          <label className="label">Email</label>
          <input type="email" className="inputField" value={email} disabled />
        </div>

        <div className="inputGroup">
          <label className="label">Bio</label>
          <textarea className="inputField bioField" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <button className="button" onClick={handleSaveChanges}>Save Changes</button>
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
