import { useState, useCallback } from 'react';
import { 
  generateTiles, 
  flipCoin, 
  checkWin, 
  getWinBonus, 
  getOppositePlayer, 
  formatPlayerName,
  TILE_COUNT,
  TILES_PER_PLAYER,
  GAME_STATES,
  PLAYER_TYPES
} from '../utils/gameLogic';

/**
 * Custom hook for managing game state
 */
export const useGameState = () => {
  // Game setup states
  const [gameState, setGameState] = useState(GAME_STATES.SETUP);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  
  // Coin flip states
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  
  // Game board states
  const [tiles, setTiles] = useState([]);
  const [clickedTiles, setClickedTiles] = useState(Array(TILE_COUNT).fill(false));
  
  // Score states
  const [scores, setScores] = useState({
    [PLAYER_TYPES.CHICKEN]: 0,
    [PLAYER_TYPES.BANANA]: 0
  });
  
  const [tilesLeft, setTilesLeft] = useState({
    [PLAYER_TYPES.CHICKEN]: TILES_PER_PLAYER,
    [PLAYER_TYPES.BANANA]: TILES_PER_PLAYER
  });
  
  // UI states
  const [message, setMessage] = useState('Choose your side to begin!');
  const [isGameOver, setIsGameOver] = useState(false);
  
  /**
   * Handle player choice and start coin flip
   */
  const handlePlayerChoice = useCallback(async (choice) => {
    setPlayerChoice(choice);
    setIsFlipping(true);
    setMessage('Flipping the coin...');
    
    try {
      const result = await flipCoin();
      setCoinResult(result);
      setCurrentPlayer(result);
      setMessage(
        `${result === PLAYER_TYPES.CHICKEN ? 'Heads (Chicken)' : 'Tails (Banana)'}! ${formatPlayerName(result)} player goes first!`
      );
      
      // Initialize game board
      setTiles(generateTiles());
      
      setTimeout(() => {
        setGameState(GAME_STATES.PLAYING);
        setMessage(`${formatPlayerName(result)} player's turn!`);
      }, 1500);
    } catch (error) {
      console.error('Error during coin flip:', error);
      setMessage('Error occurred. Please try again.');
    } finally {
      setIsFlipping(false);
    }
  }, []);
  
  /**
   * Handle tile click
   */
  const handleTileClick = useCallback((index) => {
    if (gameState !== GAME_STATES.PLAYING || clickedTiles[index]) {
      if (clickedTiles[index]) {
        setMessage('Tile already clicked!');
      }
      return;
    }
    
    const newClickedTiles = [...clickedTiles];
    newClickedTiles[index] = true;
    setClickedTiles(newClickedTiles);
    
    const tileType = tiles[index];
    
    // Check if player clicked wrong tile
    if (tileType !== currentPlayer) {
      const winner = getOppositePlayer(currentPlayer);
      const bonus = getWinBonus();
      
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + bonus
      }));
      
      setMessage(`Wrong tile! ${formatPlayerName(winner)} player wins! +${bonus} points`);
      setGameState(GAME_STATES.FINISHED);
      setIsGameOver(true);
      return;
    }
    
    // Correct tile clicked - update score and tiles left
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1
    }));
    
    const newTilesLeft = tilesLeft[currentPlayer] - 1;
    setTilesLeft(prev => ({
      ...prev,
      [currentPlayer]: newTilesLeft
    }));
    
    // Check for win condition
    if (checkWin(currentPlayer, newTilesLeft)) {
      setMessage(`${formatPlayerName(currentPlayer)} player wins!`);
      setGameState(GAME_STATES.FINISHED);
      setIsGameOver(true);
      return;
    }
    
    // Switch to next player
    const nextPlayer = getOppositePlayer(currentPlayer);
    setCurrentPlayer(nextPlayer);
    setMessage(`${formatPlayerName(nextPlayer)} player's turn!`);
  }, [gameState, clickedTiles, tiles, currentPlayer, tilesLeft]);
  
  /**
   * Reset game to initial state
   */
  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.SETUP);
    setPlayerChoice(null);
    setCurrentPlayer(null);
    setIsFlipping(false);
    setCoinResult(null);
    setTiles([]);
    setClickedTiles(Array(TILE_COUNT).fill(false));
    setScores({
      [PLAYER_TYPES.CHICKEN]: 0,
      [PLAYER_TYPES.BANANA]: 0
    });
    setTilesLeft({
      [PLAYER_TYPES.CHICKEN]: TILES_PER_PLAYER,
      [PLAYER_TYPES.BANANA]: TILES_PER_PLAYER
    });
    setMessage('Choose your side to begin!');
    setIsGameOver(false);
  }, []);
  
  return {
    // States
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
    
    // Actions
    handlePlayerChoice,
    handleTileClick,
    resetGame
  };
};
