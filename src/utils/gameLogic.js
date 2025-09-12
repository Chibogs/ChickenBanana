/**
 * Game logic utilities for Chicken Banana game
 */

export const TILE_COUNT = 36;
export const GRID_SIZE = 6;
export const TILES_PER_PLAYER = 18;

export const GAME_STATES = {
  SETUP: 'setup',
  PLAYING: 'playing',
  FINISHED: 'finished'
};

export const PLAYER_TYPES = {
  CHICKEN: 'chicken',
  BANANA: 'banana'
};

/**
 * Generate randomized tile assignments
 * @returns {string[]} Array of tile assignments
 */
export const generateTiles = () => {
  const assignments = Array(TILE_COUNT).fill(PLAYER_TYPES.CHICKEN);
  // Fill half with banana tiles
  assignments.fill(PLAYER_TYPES.BANANA, TILES_PER_PLAYER);
  
  // Fisher-Yates shuffle algorithm
  for (let i = assignments.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [assignments[i], assignments[j]] = [assignments[j], assignments[i]];
  }
  
  return assignments;
};

/**
 * Simulate coin flip with animation delay
 * @returns {Promise<string>} Promise that resolves to the winning player type
 */
export const flipCoin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Math.random() < 0.5 ? PLAYER_TYPES.CHICKEN : PLAYER_TYPES.BANANA;
      resolve(result);
    }, 2000);
  });
};

/**
 * Check if the game is won
 * @param {string} currentPlayer - Current player type
 * @param {number} tilesLeft - Tiles remaining for current player
 * @returns {boolean} Whether the game is won
 */
export const checkWin = (currentPlayer, tilesLeft) => {
  return tilesLeft === 0;
};

/**
 * Calculate score bonus for winning by opponent's mistake
 * @returns {number} Bonus points
 */
export const getWinBonus = () => 5;

/**
 * Get the opposite player type
 * @param {string} playerType - Current player type
 * @returns {string} Opposite player type
 */
export const getOppositePlayer = (playerType) => {
  return playerType === PLAYER_TYPES.CHICKEN ? PLAYER_TYPES.BANANA : PLAYER_TYPES.CHICKEN;
};

/**
 * Format player name for display
 * @param {string} playerType - Player type
 * @returns {string} Formatted player name
 */
export const formatPlayerName = (playerType) => {
  return playerType.charAt(0).toUpperCase() + playerType.slice(1);
};
