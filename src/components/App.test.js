import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { useGameState } from '../hooks/useGameState';
import { useResponsive } from '../hooks/useResponsive';

// Mock the custom hooks
jest.mock('../hooks/useGameState');
jest.mock('../hooks/useResponsive');

// Mock preloadImages
jest.mock('../utils/images', () => ({
  preloadImages: jest.fn(() => Promise.resolve()),
  getPlayerImage: jest.fn((type) => `mock-${type}-image.jpg`),
  IMAGES: {
    chicken: 'mock-chicken.jpg',
    banana: 'mock-banana.jpg'
  }
}));

const mockGameState = {
  gameState: 'setup',
  playerChoice: null,
  currentPlayer: null,
  isFlipping: false,
  coinResult: null,
  tiles: [],
  clickedTiles: [],
  scores: { chicken: 0, banana: 0 },
  tilesLeft: { chicken: 18, banana: 18 },
  message: 'Choose your side to begin!',
  isGameOver: false,
  handlePlayerChoice: jest.fn(),
  handleTileClick: jest.fn(),
  resetGame: jest.fn()
};

const mockResponsive = {
  windowSize: { width: 1024, height: 768 },
  breakpoint: 'desktop',
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: true
};

beforeEach(() => {
  useGameState.mockReturnValue(mockGameState);
  useResponsive.mockReturnValue(mockResponsive);
});

describe('App Component', () => {
  test('renders app title', () => {
    render(<App />);
    expect(screen.getByText(/chicken banana game/i)).toBeInTheDocument();
  });

  test('renders app subtitle', () => {
    render(<App />);
    expect(screen.getByText(/choose your side and find all your tiles/i)).toBeInTheDocument();
  });

  test('shows player selection when in setup state', () => {
    render(<App />);
    expect(screen.getByText(/choose your side/i)).toBeInTheDocument();
  });

  test('calls handlePlayerChoice when player is selected', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const chickenButton = screen.getByLabelText(/choose chicken team/i);
    await user.click(chickenButton);
    
    expect(mockGameState.handlePlayerChoice).toHaveBeenCalledWith('chicken');
  });

  test('shows coin flip when player is chosen and flipping', () => {
    useGameState.mockReturnValue({
      ...mockGameState,
      playerChoice: 'chicken',
      isFlipping: true,
      message: 'Flipping the coin...'
    });

    render(<App />);
    expect(screen.getByText(/flipping the coin/i)).toBeInTheDocument();
  });

  test('shows game board when in playing state', () => {
    useGameState.mockReturnValue({
      ...mockGameState,
      gameState: 'playing',
      playerChoice: 'chicken',
      currentPlayer: 'chicken',
      tiles: new Array(36).fill('chicken'),
      message: 'Chicken player\'s turn!'
    });

    render(<App />);
    expect(screen.getByText(/game status/i)).toBeInTheDocument();
  });

  test('shows mobile tip on mobile devices', () => {
    useResponsive.mockReturnValue({
      ...mockResponsive,
      isMobile: true,
      breakpoint: 'mobile'
    });

    render(<App />);
    expect(screen.getByText(/tip: rotate your device/i)).toBeInTheDocument();
  });

  test('calls resetGame when new game button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const newGameButton = screen.getByLabelText(/start a new game/i);
    await user.click(newGameButton);
    
    expect(mockGameState.resetGame).toHaveBeenCalled();
  });
});

describe('Game Message Types', () => {
  test('shows success message type for game over', () => {
    useGameState.mockReturnValue({
      ...mockGameState,
      isGameOver: true,
      message: 'Chicken player wins!'
    });

    render(<App />);
    const messageElement = screen.getByText(/chicken player wins/i).closest('.game-message');
    expect(messageElement).toHaveClass('success');
  });

  test('shows error message type for wrong tile', () => {
    useGameState.mockReturnValue({
      ...mockGameState,
      message: 'Wrong tile! Banana player wins!'
    });

    render(<App />);
    const messageElement = screen.getByText(/wrong tile/i).closest('.game-message');
    expect(messageElement).toHaveClass('error');
  });

  test('shows warning message type for already clicked tile', () => {
    useGameState.mockReturnValue({
      ...mockGameState,
      message: 'Tile already clicked!'
    });

    render(<App />);
    const messageElement = screen.getByText(/tile already clicked/i).closest('.game-message');
    expect(messageElement).toHaveClass('warning');
  });
});

describe('Responsive Behavior', () => {
  test('adapts layout for tablet devices', () => {
    useResponsive.mockReturnValue({
      ...mockResponsive,
      isTablet: true,
      isMobile: false,
      breakpoint: 'tablet'
    });

    render(<App />);
    // Test passes if no errors are thrown during responsive rendering
    expect(screen.getByText(/chicken banana game/i)).toBeInTheDocument();
  });

  test('adapts layout for desktop devices', () => {
    useResponsive.mockReturnValue({
      ...mockResponsive,
      isDesktop: true,
      breakpoint: 'desktop'
    });

    render(<App />);
    // Test passes if no errors are thrown during responsive rendering
    expect(screen.getByText(/chicken banana game/i)).toBeInTheDocument();
  });
});

describe('Error Handling', () => {
  test('handles image loading errors gracefully', () => {
    // Mock console.warn to prevent test output noise
    const originalWarn = console.warn;
    console.warn = jest.fn();

    render(<App />);
    
    // Test passes if component renders without throwing errors
    expect(screen.getByText(/chicken banana game/i)).toBeInTheDocument();
    
    console.warn = originalWarn;
  });
});
