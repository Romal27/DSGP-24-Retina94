import { useState } from "react";
import styles from "./Signup.module.css"; 

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
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.signupBox}>
                <h2 className={styles.title}>Sign Up</h2>
                
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={styles.inputField}
                />
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className={styles.inputField}
                />
                
                {error && <p className={styles.errorMessage}>{error}</p>}
                
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
