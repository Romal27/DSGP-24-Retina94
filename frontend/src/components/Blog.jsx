import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Blog.css";
import whatisDR from "../assets/whatisDR.jpg";
import screening from "../assets/screening,prevention&treatment.webp";
import earlyDetection from "../assets/earlyDetection.webp";
import eyeExam from "../assets/eyeExam.webp";
import moh from "../assets/moh.webp";
import drStages from "../assets/DRstages.png";
import treatedDR from "../assets/treatedDR.jpg";
import drBlog8 from "../assets/DRblog8.jpg";
import fundusCamera from "../assets/funduscamera.jpg";
import futureOfDR from "../assets/futureofDR.png";
import {
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";


const Blog = () => {
  const blogPosts = [
    {
      title: "What is Diabetic Retinopathy?",
      description: "Diabetic retinopathy is an eye condition that can cause vision loss and blindness...",
      image: whatisDR,
      link: "https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy",
    },
    {
      title: "Diabetic Retinopathy: Screening, Prevention and Treatment",
      description: "Diabetic retinopathy is the leading cause of new cases of blindness in patients with diabetes mellitus...",
      image: screening,
      link: "https://consultqd.clevelandclinic.org/diabetic-retinopathy-screening-prevention-and-treatment",
    },
    {
      title: "Diabetic Retinopathy: The increasing need for early detection and awareness",
      description: "Diabetes affects more than 101 million people in India today...",
      image: earlyDetection,
      link: "https://www.deccanchronicle.com/lifestyle/health-and-well-being/diabetic-retinopathy-the-increasing-need-for-early-detection-and-awareness-1869726",
    },
    {
      title: "A time to stress the importance of regular eye exams",
      description: "According to the CDC, about 11 million Americans older than 12 years require vision correction...",
      image: eyeExam,
      link: "https://www.healio.com/news/optometry/20240826/national-eye-exam-month-a-time-to-stress-the-importance-of-regular-eye-exams",
    },
    {
      title: "MOH Exploring AI For Cancer, TB, Diabetic Retinopathy Screenings",
      description: "The Ministry of Health (MOH) is studying the use of artificial intelligence (AI)...",
      image: moh,
      link: "https://codeblue.galencentre.org/2025/03/moh-exploring-ai-for-cancer-tb-diabetic-retinopathy-screenings/",
    },
    {
      title: "Stages of Diabetic Retinopathy",
      description: "Patients with either type 1 or type 2 diabetes are at risk of developing neurovascular complications...",
      image: drStages,
      link: "https://modernod.com/articles/2019-june/the-four-stages-of-diabeticretinopathy",
    },
    {
      title: "Treatment for diabetic retinopathy",
      description: "There are a number of treatment options for diabetic retinopathy (DR)...",
      image: treatedDR,
      link: "https://www.mdfoundation.com.au/about-macular-disease/diabetic-eye-disease/treatment-for-diabetic-retinopathy/",
    },
    {
      title: "Diabetic Retinopathy",
      description: "Diabetic retinopathy is a serious sight-threatening complication of diabetes...",
      image: drBlog8,
      link: "https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/diabetic-retinopathy",
    },
    {
      title: "Fundus Camera",
      description: "The fundus camera is an instrument used for fundus photography...",
      image: fundusCamera,
      link: "https://www.ncbi.nlm.nih.gov/books/NBK585111/",
    },
    {
      title: "Future Opportunities in Diabetic Retinopathy Research",
      description: "Improvements in diabetes and diabetic retinopathy treatments have resulted from better understanding...",
      image: futureOfDR,
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4959271/",
    },
  ];
  

  return (
    <div className="blog-container">
      <nav className="navbar">
  <div className="logo">Retina +94</div>
  <ul className="nav-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/stage">Stage</Link></li>
    <li><Link to="/chatbot">Chatbot</Link></li>
    <li><Link to="/direction">Direction</Link></li>
    <li><Link to="/blog">Blog</Link></li>
    <li><Link to="/aboutus">About Us</Link></li>
    <li><Link to="/profile"><FaUser /></Link></li>
  </ul>
  <div className="auth-buttons">
    <Link to="/login" className="btn">Login</Link>
    <Link to="/signup" className="btn btn-signup">Sign Up</Link>
  </div>
</nav>


      {/* Blog Header */}
      <motion.div
        className="blog-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="animated-title">📚 Retinopathy Blog</h1>
        <p className="animated-subtitle">
          A curated hub of knowledge, breakthroughs, and patient-friendly insights.
        </p>
      </motion.div>

      {/* Blog Cards */}
      <motion.section
        className="blog-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="blog-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-readmore"
              >
                Read More
              </a>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <footer className="footer">
                     <div className="footer-content">
                       <p>© 2025 Retina +94. All rights reserved.</p>
                       <ul className="footer-links">
                         <li><Link to="/privacy">Privacy</Link></li>
                         <li><Link to="/terms">Terms</Link></li>
                       </ul>
                       <div className="footer-contact">
                         <p><strong>📞</strong> +94 71 123 4567</p>
                         <p><strong>📧</strong> retina94@healthcare.ai</p>
                       </div>
                       <div className="social-icons">
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                         <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                       </div>
                     </div>
                   </footer>
    </div>
  );
};

export default Blog;
