// GameData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameData = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://game-task-backend.onrender.com/api/get-games');
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };
  
    fetchGames();
  }, []);
  

  return (
    <div>
      <h1>Saved Games</h1>
      {games.length === 0 ? (
        <p>No games saved yet.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <h3>{game.player1Name} vs {game.player2Name}</h3>
              <p>Rounds: {JSON.stringify(game.rounds)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameData;
