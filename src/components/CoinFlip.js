import React from 'react';
import { getPlayerImage } from '../utils/images';
import { PLAYER_TYPES } from '../utils/gameLogic';
import './CoinFlip.css';

const CoinFlip = ({ isFlipping, coinResult, message }) => {
  return (
    <div className="coin-flip-container">
      <div className="coin-wrapper">
        <div className={`coin ${isFlipping ? 'flipping' : ''} ${coinResult || ''}`}>
          <div className="coin-face coin-heads">
            <img 
              src={getPlayerImage(PLAYER_TYPES.CHICKEN)} 
              alt="Chicken (Heads)" 
              className="coin-image"
              onError={(e) => {
                e.target.src = getPlayerImage(PLAYER_TYPES.CHICKEN, true);
              }}
            />
            <span className="coin-label">Heads</span>
          </div>
          <div className="coin-face coin-tails">
            <img 
              src={getPlayerImage(PLAYER_TYPES.BANANA)} 
              alt="Banana (Tails)" 
              className="coin-image"
              onError={(e) => {
                e.target.src = getPlayerImage(PLAYER_TYPES.BANANA, true);
              }}
            />
            <span className="coin-label">Tails</span>
          </div>
        </div>
      </div>
      
      <div className="coin-message">
        <p>{message}</p>
      </div>
      
      {isFlipping && (
        <div className="flip-indicator">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
