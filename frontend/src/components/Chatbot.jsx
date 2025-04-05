// Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaRegPaperPlane } from "react-icons/fa";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Retina Bot, your eye health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "What is diabetic retinopathy?",
    "How often should I get my eyes checked?",
    "Can you explain the DR stages?",
    "What treatments are available for DR?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text = inputMessage) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (message) => {
    const responses = {
      "what is diabetic retinopathy":
        "Diabetic Retinopathy is an eye condition caused by high blood sugar levels...",
      "how often should i get my eyes checked":
        "It's recommended to get your eyes checked at least once a year...",
      "can you explain the dr stages":
        "DR has four stages: Mild, Moderate, Severe, and Proliferative.",
      "what treatments are available for dr":
        "Treatments include anti-VEGF, laser therapy, or surgery.",
    };

    const lower = message.toLowerCase();
    for (const key in responses) {
      if (lower.includes(key)) return responses[key];
    }
    return "I'm not sure about that. Can you try rephrasing?";
  };

  return (
    <div className="chatbot-box">
      <div className="chatbot-header">👁️ Retina Bot</div>
      <div className="chatbox-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot">
            <div className="bubble typing">...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="suggestions">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => handleSendMessage(s)} className="suggestion-btn">
            {s}
          </button>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask Retina Bot anything..."
        />
        <button onClick={() => handleSendMessage()}><FaRegPaperPlane /></button>
      </div>
    </div>
  );
};

export default Chatbot;
