import React from 'react';
import { PLAYER_TYPES } from '../utils/gameLogic';
import { getPlayerImage } from '../utils/images';
import './PlayerSelection.css';

const PlayerSelection = ({ onPlayerChoice, disabled = false }) => {
  const handleChoice = (playerType) => {
    if (!disabled) {
      onPlayerChoice(playerType);
    }
  };

  return (
    <div className="player-selection">
      <h2 className="selection-title">Choose Your Side</h2>
      <div className="selection-buttons">
        <button
          className="player-button chicken-button"
          onClick={() => handleChoice(PLAYER_TYPES.CHICKEN)}
          disabled={disabled}
          aria-label="Choose Chicken team"
        >
          <div className="button-content">
            <img 
              src={getPlayerImage(PLAYER_TYPES.CHICKEN)} 
              alt="Chicken" 
              className="player-image"
              onError={(e) => {
                e.target.src = getPlayerImage(PLAYER_TYPES.CHICKEN, true);
              }}
            />
            <span className="player-name">Chicken</span>
          </div>
        </button>
        
        <button
          className="player-button banana-button"
          onClick={() => handleChoice(PLAYER_TYPES.BANANA)}
          disabled={disabled}
          aria-label="Choose Banana team"
        >
          <div className="button-content">
            <img 
              src={getPlayerImage(PLAYER_TYPES.BANANA)} 
              alt="Banana" 
              className="player-image"
              onError={(e) => {
                e.target.src = getPlayerImage(PLAYER_TYPES.BANANA, true);
              }}
            />
            <span className="player-name">Banana</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PlayerSelection;
