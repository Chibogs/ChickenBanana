import React from 'react';
import GameTile from './GameTile';
import { useResponsive } from '../hooks/useResponsive';
import { GRID_SIZE } from '../utils/gameLogic';
import './GameBoard.css';

const GameBoard = ({ 
  tiles, 
  clickedTiles, 
  onTileClick, 
  disabled = false,
  revealAll = false 
}) => {
  const { isMobile, isTablet } = useResponsive();
  
  const getGridClass = () => {
    if (isMobile) return 'grid-mobile';
    if (isTablet) return 'grid-tablet';
    return 'grid-desktop';
  };

  return (
    <div className="game-board">
      <div className={`game-grid ${getGridClass()}`}>
        {tiles.map((tileType, index) => (
          <GameTile
            key={index}
            index={index}
            tileType={tileType}
            isClicked={clickedTiles[index]}
            isRevealed={clickedTiles[index] || revealAll}
            onClick={onTileClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
