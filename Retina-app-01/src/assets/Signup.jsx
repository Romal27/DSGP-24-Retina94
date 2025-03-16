import { useState } from "react";
import "./Signup.css"; 

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userName || !email || !password || !confPassword) {
            setError("All fields are required");
            return;
        }
    
        if (password !== confPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        const userData = { userName, email, password };
    
        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
    
            alert("Registration successful!");
            setUserName("");
            setEmail("");
            setPassword("");
            setConfPassword("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };
    
    return (
        <div className="container">
            <div className="signupBox">
                <h2 className="title">Sign Up</h2>
                {error && <p className="errorMessage">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label className="label">Username</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="inputField"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="inputGroup">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputField"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="inputGroup">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputField"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="inputGroup">
                        <label className="label">Confirm Password</label>
                        <input
                            type="password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            className="inputField"
                            placeholder="Re-enter your password"
                        />
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="termsContainer">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                        />
                        <label htmlFor="terms">
                            I agree to the{" "}
                            <span className="termsLink" onClick={() => setShowTerms(true)}>
                                Terms & Conditions
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>

            {/* Terms & Conditions Modal */}
            {showTerms && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h3>Terms & Conditions</h3>
                        <p>
                            By using this service, you agree to abide by our terms and conditions.
                            We collect and process user data securely. Please read carefully before proceeding.
                        </p>
                        <button className="closeButton" onClick={() => setShowTerms(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
