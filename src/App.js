import React, { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useResponsive } from './hooks/useResponsive';
import { preloadImages } from './utils/images';
import { GAME_STATES } from './utils/gameLogic';

// Components
import PlayerSelection from './components/PlayerSelection';
import CoinFlip from './components/CoinFlip';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameMessage from './components/GameMessage';
import GameControls from './components/GameControls';

// Styles
import './styles/globals.css';
import './App.css';

function App() {
  const {
    gameState,
    playerChoice,
    currentPlayer,
    isFlipping,
    coinResult,
    tiles,
    clickedTiles,
    scores,
    tilesLeft,
    message,
    isGameOver,
    handlePlayerChoice,
    handleTileClick,
    resetGame
  } = useGameState();

  const { isMobile } = useResponsive();

  // Preload images on component mount
  useEffect(() => {
    preloadImages().catch(console.warn);
  }, []);

  const getMessageType = () => {
    if (isGameOver) return 'success';
    if (message.includes('Wrong tile')) return 'error';
    if (message.includes('already clicked')) return 'warning';
    if (message.includes('turn')) return 'turn';
    return 'info';
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">🐔🍌 Chicken Banana Game</h1>
          <p className="app-subtitle">
            Choose your side and find all your tiles before your opponent!
          </p>
        </header>

        <main className="app-main">
          {gameState === GAME_STATES.SETUP && !playerChoice && (
            <PlayerSelection 
              onPlayerChoice={handlePlayerChoice}
              disabled={isFlipping}
            />
          )}

          {gameState === GAME_STATES.SETUP && playerChoice && (
            <CoinFlip
              isFlipping={isFlipping}
              coinResult={coinResult}
              message={message}
            />
          )}

          {gameState !== GAME_STATES.SETUP && (
            <>
              <GameMessage 
                message={message}
                type={getMessageType()}
                isVisible={!!message}
              />
              
              <ScoreBoard
                scores={scores}
                tilesLeft={tilesLeft}
                currentPlayer={currentPlayer}
                isGameOver={isGameOver}
                playerChoice={playerChoice}
              />
              
              <GameBoard
                tiles={tiles}
                clickedTiles={clickedTiles}
                onTileClick={handleTileClick}
                disabled={isGameOver}
                revealAll={isGameOver}
              />
            </>
          )}
        </main>

        <footer className="app-footer">
          <GameControls
            onNewGame={resetGame}
            onQuit={resetGame}
            disabled={isFlipping}
            gameState={gameState}
          />
          
          {isMobile && (
            <p className="mobile-tip">
              💡 Tip: Rotate your device for a better experience!
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

export default App;
