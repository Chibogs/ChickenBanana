import React from 'react';
import { getPlayerImage } from '../utils/images';
import { useResponsive } from '../hooks/useResponsive';
import './GameTile.css';

const GameTile = ({ 
  index, 
  tileType, 
  isClicked, 
  isRevealed, 
  onClick, 
  disabled = false 
}) => {
  const { isMobile } = useResponsive();
  
  const handleClick = () => {
    if (!disabled && !isClicked && onClick) {
      onClick(index);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <div
      className={`game-tile ${isClicked ? 'clicked' : ''} ${isRevealed ? 'revealed' : ''}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={disabled || isClicked ? -1 : 0}
      role="button"
      aria-label={`Tile ${index + 1}${isRevealed ? `, contains ${tileType}` : ''}`}
      aria-pressed={isClicked}
      style={{
        cursor: disabled || isClicked ? 'not-allowed' : 'pointer'
      }}
    >
      {isRevealed ? (
        <img
          src={getPlayerImage(tileType)}
          alt={tileType}
          className="tile-image"
          draggable={false}
          onError={(e) => {
            e.target.src = getPlayerImage(tileType, true);
          }}
        />
      ) : (
        <div className="tile-number">
          {index + 1}
        </div>
      )}
      
      {!isRevealed && (
        <div className="tile-overlay">
          <div className="tile-shine"></div>
        </div>
      )}
    </div>
  );
};

export default GameTile;
