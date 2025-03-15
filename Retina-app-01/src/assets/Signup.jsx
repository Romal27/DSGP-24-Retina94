import { useState } from "react";
import "./Signup.css"; // ✅ Import regular CSS correctly

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userName || !email || !password || !confPassword) {
            setError("All fields are required");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email. Please check again");
            return;
        }

        if (password !== confPassword) {
            setError("The passwords do not match. Please check again");
            return;
        }

        console.log("Signing Up");
        setError("");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="signupBox">
                <h2 className="title">Sign Up</h2>

                <div>
                    <label className="label">Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="inputField"
                    />
                </div>

                <div>
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputField"
                    />
                </div>

                <div>
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputField"
                    />
                </div>

                <div>
                    <label className="label">Confirm Password:</label>
                    <input
                        type="password"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        className="inputField"
                    />
                </div>

                {error && <p className="errorMessage">{error}</p>}

                <button type="submit" className="button">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
