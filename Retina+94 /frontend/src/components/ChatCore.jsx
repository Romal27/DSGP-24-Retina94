import React, { useState, useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import './Chatbot.css';

const ChatCore = ({ showHeader = true }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👁️ Hello! I'm Retina Bot, your eye health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "What is diabetic retinopathy?",
    "How often should I get my eyes checked?",
    "Can you explain the DR stages?",
    "What treatments are available for DR?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customText) => {
    const text = customText || input;
    if (!text.trim()) return;
  
    const userMsg = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
  
    try {
      const response = await fetch('http://localhost:5005/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
        }),
      });
  
      const data = await response.json();
  
      const botReply = {
        id: messages.length + 2,
        text: data.text || "⚠️ No response received.",
        sender: 'bot',
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Error connecting to chatbot API:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "⚠️ Sorry, I'm having trouble reaching the server.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="chatbot-container">
      {showHeader && (
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <div className="avatar-circle">
              <span className="avatar-icon">🤖</span>
            </div>
          </div>
          <div className="chatbot-title">
            <h2>Retina Bot</h2>
            <div className="status-indicator">Online</div>
          </div>
        </div>
      )}

      <div className="chatbot-messages">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`message-wrapper ${msg.sender === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`message ${msg.sender}-message`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-timestamp">{formatTime(msg.timestamp)}</div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="message-wrapper bot-message-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="message bot-message typing">
              <div className="message-content">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <div className="typing-text">Retina Bot is typing…</div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="message-suggestions">
        <div className="suggestions-title">Suggested topics:</div>
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => handleSend(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="send-button"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatCore;
