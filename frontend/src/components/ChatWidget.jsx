// ChatWidget.jsx
import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import Chatbot from "./Chatbot";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-widget">
      <button className="chat-btn" onClick={toggleChat} aria-label="Toggle Chatbot">
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className="chat-modal">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;