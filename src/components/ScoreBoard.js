import React from 'react';
import { formatPlayerName, PLAYER_TYPES } from '../utils/gameLogic';
import { getPlayerImage } from '../utils/images';
import './ScoreBoard.css';

const ScoreBoard = ({ 
  scores, 
  tilesLeft, 
  currentPlayer, 
  isGameOver,
  playerChoice 
}) => {
  const getPlayerStatus = (playerType) => {
    if (isGameOver) return 'finished';
    return currentPlayer === playerType ? 'active' : 'waiting';
  };

  const PlayerScore = ({ playerType, isUserChoice = false }) => (
    <div className={`score-card ${getPlayerStatus(playerType)} ${isUserChoice ? 'user-choice' : ''}`}>
      <div className="player-info">
        <img 
          src={getPlayerImage(playerType)} 
          alt={`${formatPlayerName(playerType)} player`}
          className="player-avatar"
          onError={(e) => {
            e.target.src = getPlayerImage(playerType, true);
          }}
        />
        <div className="player-details">
          <h3 className="player-name">
            {formatPlayerName(playerType)} Player
            {isUserChoice && <span className="you-badge">YOU</span>}
          </h3>
          <div className="player-stats">
            <div className="stat">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{scores[playerType]}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Tiles Left:</span>
              <span className="stat-value">{tilesLeft[playerType]}</span>
            </div>
          </div>
        </div>
      </div>
      
      {currentPlayer === playerType && !isGameOver && (
        <div className="turn-indicator">
          <div className="pulse-dot"></div>
          <span>Your Turn</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">Game Status</h2>
      
      <div className="score-container">
        <PlayerScore 
          playerType={PLAYER_TYPES.CHICKEN} 
          isUserChoice={playerChoice === PLAYER_TYPES.CHICKEN}
        />
        
        <div className="vs-divider">
          <span>VS</span>
        </div>
        
        <PlayerScore 
          playerType={PLAYER_TYPES.BANANA} 
          isUserChoice={playerChoice === PLAYER_TYPES.BANANA}
        />
      </div>
    </div>
  );
};

export default ScoreBoard;
