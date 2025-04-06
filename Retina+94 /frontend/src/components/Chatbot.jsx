
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ChatCore from './ChatCore';
import './Chatbot.css';

const Chatbot = () => {
  const navigate = useNavigate();

  return (
    <div className="chatbot-page">
      <div className="chatbot-overlay" />
      <button onClick={() => navigate(-1)} className="back-button">
        <ArrowBackIcon fontSize="small" style={{ marginRight: 6 }} />
        Back
      </button>
      <ChatCore showHeader={true} />

    </div>
  );
};

export default Chatbot;
