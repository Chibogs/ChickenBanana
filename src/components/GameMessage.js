import React from 'react';
import './GameMessage.css';

const GameMessage = ({ message, type = 'info', isVisible = true }) => {
  if (!isVisible || !message) return null;

  return (
    <div className={`game-message ${type}`}>
      <div className="message-content">
        {type === 'error' && <span className="message-icon">⚠️</span>}
        {type === 'success' && <span className="message-icon">🎉</span>}
        {type === 'turn' && <span className="message-icon">👆</span>}
        <span className="message-text">{message}</span>
      </div>
    </div>
  );
};

export default GameMessage;
