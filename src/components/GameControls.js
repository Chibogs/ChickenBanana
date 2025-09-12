import React from 'react';
import './GameControls.css';

const GameControls = ({ onNewGame, onQuit, disabled = false, gameState }) => {
  return (
    <div className="game-controls">
      <button
        className="control-button new-game-button"
        onClick={onNewGame}
        disabled={disabled}
        aria-label="Start a new game"
      >
        <span className="button-icon">🎮</span>
        <span className="button-text">New Game</span>
      </button>
      
      {gameState !== 'setup' && (
        <button
          className="control-button quit-button"
          onClick={onQuit}
          disabled={disabled}
          aria-label="Quit current game"
        >
          <span className="button-icon">🚪</span>
          <span className="button-text">Quit</span>
        </button>
      )}
    </div>
  );
};

export default GameControls;
