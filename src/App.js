import React, { useState } from 'react';
import './App.css';

const TILE_COUNT = 36;

const chickenImg = 'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg';
const bananaImg = 'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768';
const coverImg = '/images/cloche.jpg';  

function generateTiles() {
  const assignments = Array(TILE_COUNT).fill('chicken').fill('banana', 18);
  for (let i = assignments.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [assignments[i], assignments[j]] = [assignments[j], assignments[i]];
  }
  return assignments;
}

function App() {
  const [tiles, setTiles] = useState(generateTiles());
  const [clickedTiles, setClickedTiles] = useState(Array(TILE_COUNT).fill(false));
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [message, setMessage] = useState('Game started! Chicken player goes first.');
  const [currentPlayer, setCurrentPlayer] = useState('chicken');
  const [player1TilesLeft, setPlayer1TilesLeft] = useState(18);
  const [player2TilesLeft, setPlayer2TilesLeft] = useState(18);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameOver) return;

    if (clickedTiles[index]) {
      setMessage('Tile already clicked!');
      return;
    }

    // Flip the tile to reveal image
    const newClicked = [...clickedTiles];
    newClicked[index] = true;
    setClickedTiles(newClicked);

    // Check if the revealed tile matches current player's type
    if (tiles[index] !== currentPlayer) {
      setMessage(`Wrong tile! ${currentPlayer === 'chicken' ? 'Banana' : 'Chicken'} player wins! +5 points`);
      if (currentPlayer === 'chicken') {
        setPlayer2Score((score) => score + 5);
      } else {  
        setPlayer1Score((score) => score + 5);
      }
      setGameOver(true);
      return;
    }

    if (currentPlayer === 'chicken') {
      const newLeft = player1TilesLeft - 1;
      setPlayer1TilesLeft(newLeft);
      if (newLeft === 0) {
        setMessage('Chicken player wins! +5 points');
        setPlayer1Score(score => score + 5);
        setGameOver(true);
        return;
      }
    } else {
      const newLeft = player2TilesLeft - 1;
      setPlayer2TilesLeft(newLeft);
      if (newLeft === 0) {
        setMessage('Banana player wins! +5 points');
        setPlayer2Score(score => score + 5);
        setGameOver(true);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === 'chicken' ? 'banana' : 'chicken');
    setMessage(`${currentPlayer === 'chicken' ? 'Banana' : 'Chicken'} player's turn.`);
  };

  const restartGame = () => {
    setTiles(generateTiles());
    setClickedTiles(Array(TILE_COUNT).fill(false));
    setPlayer1TilesLeft(18);
    setPlayer2TilesLeft(18);
    setCurrentPlayer('chicken');
    setGameOver(false);
    setMessage('Game restarted! Chicken player goes first.');
  };

  return (
    <div className="container">
      <h1>Chicken Banana Minesweeper Game</h1>
      <div className="scoreboard">
        <p>Chicken Player Score: {player1Score}</p>
        <p>Banana Player Score: {player2Score}</p>
      </div>
      <p>{message}</p>
      <div className="grid">
{tiles.map((tileType, index) => {
  const isClicked = clickedTiles[index];
  const isCurrent = currentPlayer === tileType && !isClicked;

  return (
    <div
      key={index}
      className={`square ${isClicked ? 'clicked' : ''} ${isCurrent ? 'current-player' : ''}`}
      onClick={() => handleClick(index)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        userSelect: 'none',
        color: isClicked ? 'transparent' : '#ffd700',
        cursor: isClicked ? 'default' : 'pointer',
      }}
    >
      {isClicked ? (
        <img
          src={tileType === 'chicken' ? chickenImg : bananaImg}
          alt={tileType}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            imageRendering: 'pixelated',
          }}
          draggable={false}
        />
      ) : (
        index + 1
      )}
    </div>
  );
})}

      </div>
      <button onClick={restartGame}>Restart Game</button>
      <p><i>Current turn: {currentPlayer === 'chicken' ? 'Chicken Player' : 'Banana Player'}</i></p>
    </div>
  );
}

export default App;
