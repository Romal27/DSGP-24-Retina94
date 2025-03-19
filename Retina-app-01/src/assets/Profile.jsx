import { useState, useEffect } from "react";
import "../assets/Profile.css";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "TeranSen");
  const [email, setEmail] = useState(localStorage.getItem("email") || "romal@example.com");
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "Thiviru Dulanka");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "Hey there! I'm using this app.");

  useEffect(() => {
    setProfilePic(localStorage.getItem("profilePic") || null);
  }, []);

 
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); // local Storage
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSaveChanges = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("fullName", fullName);
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
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-pic"
            />
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
          <label className="label">Full Name</label>
          <input type="text" className="inputField" value={fullName} onChange={(e) => setFullName(e.target.value)} />
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
