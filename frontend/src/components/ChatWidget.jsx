// components/ChatWidget.jsx
import React, { useState } from 'react';
import ChatCore from './ChatCore';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-popup-header">
            <span>Retina Bot</span>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <CloseIcon />
            </button>
          </div>
          <ChatCore showHeader={false} />

        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="chat-float-button">
        <ChatIcon />
      </button>
    </div>
  );
};

export default ChatWidget;
