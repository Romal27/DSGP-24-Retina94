import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
           
            <nav className={styles.navbar}>
                <h1 className={styles.logo}>Diabetic Retinopathy Detector</h1>
                <ul className={styles.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/upload">Upload</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            
            {/* Hero Section */}
            <header className={styles.hero}>
                <h2>Detect Diabetic Retinopathy with AI</h2>
                <p>Upload your fundus images and get instant results.</p>
                <Link to="/upload" className={styles.ctaButton}>Get Started</Link>
            </header>
        </div>
    );
};

export default Home;
