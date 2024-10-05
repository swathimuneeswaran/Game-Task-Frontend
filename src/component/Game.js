import React, { useState } from 'react';
import axios from 'axios';
import "../style/Game.css"

const Game = () => {
  const [rounds, setRounds] = useState([]);
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [currentRound, setCurrentRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [player1MoveSubmitted, setPlayer1MoveSubmitted] = useState(false);

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return 'Tie';
    if (
      (choice1 === 'Stone' && choice2 === 'Scissors') ||
      (choice1 === 'Scissors' && choice2 === 'Paper') ||
      (choice1 === 'Paper' && choice2 === 'Stone')
    ) {
      return player1Name;
    }
    return player2Name;
  };

  const playRound = () => {
    console.log("Playing round:", currentRound);  // Debugging log
    if (player1Choice && player2Choice) {
      const roundWinner = determineWinner(player1Choice, player2Choice);
      const newRounds = [...rounds, { player1Choice, player2Choice, winner: roundWinner }];
      setRounds(newRounds);
      setCurrentRound(currentRound + 1);
      setPlayer1Choice('');
      setPlayer2Choice('');
      setPlayer1MoveSubmitted(false);

      if (newRounds.length === 6) {
        setGameOver(true);
        saveGame(newRounds);
      }
    }
  };

  const saveGame = (newRounds) => {
    const requestBody = {
      player1Name,
      player2Name,
      rounds: newRounds,
    };
    console.log("Request Body:", requestBody);

    axios.post('https://game-task-backend.onrender.com/api/save-game', requestBody)
      .then(response => {
        console.log("Response from server:", response.data);
        alert('Game saved successfully!');
      })
      .catch(err => {
        console.error("Error saving the game:", err);
        alert('Failed to save game.');
      });
  };

  const resetGame = () => {
    setRounds([]);
    setPlayer1Choice('');
    setPlayer2Choice('');
    setCurrentRound(0);
    setGameOver(false);
  };

  const submitPlayer1Choice = (choice) => {
    setPlayer1Choice(choice);
    setPlayer1MoveSubmitted(true);
    console.log("Player 1 chose:", choice);  // Debugging log
  };

  return (
    <div>
      <h1>Stone Paper Scissors</h1>

      <div>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </div>

      <div>
        <h2>Player 1's Choice</h2>
        <button onClick={() => submitPlayer1Choice('Stone')} disabled={player1MoveSubmitted}>Stone</button>
        <button onClick={() => submitPlayer1Choice('Paper')} disabled={player1MoveSubmitted}>Paper</button>
        <button onClick={() => submitPlayer1Choice('Scissors')} disabled={player1MoveSubmitted}>Scissors</button>
        <p>Selected: {player1MoveSubmitted ? 'Hidden until Player 2 chooses' : 'Not yet selected'}</p>
      </div>

      <div>
        <h2>Player 2's Choice</h2>
        <button onClick={() => setPlayer2Choice('Stone')} disabled={!player1MoveSubmitted}>Stone</button>
        <button onClick={() => setPlayer2Choice('Paper')} disabled={!player1MoveSubmitted}>Paper</button>
        <button onClick={() => setPlayer2Choice('Scissors')} disabled={!player1MoveSubmitted}>Scissors</button>
        <p>Selected: {player2Choice ? player2Choice : 'Not yet selected'}</p>
      </div>

      <button onClick={playRound} disabled={!player2Choice || !player1MoveSubmitted || gameOver}>
        {gameOver ? 'Game Over' : `Play Round ${currentRound + 1}`}
      </button>

      {gameOver && <button onClick={resetGame}>Restart Game</button>}

      <div>
        <h2>Rounds:</h2>
        {rounds.map((round, index) => (
          <p key={index}>
            Round {index + 1}: {round.player1Choice} vs {round.player2Choice} - Winner: {round.winner}
          </p>
        ))}
      </div>

      {gameOver && <h3>Game Over! Final Scores saved.</h3>}
    </div>
  );
};

export default Game;
