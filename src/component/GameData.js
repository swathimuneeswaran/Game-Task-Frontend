import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/GameData.css"

const GameData = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://game-task-backend.onrender.com/api/get-games');
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching game data:', error.response ? error.response.data : error.message);
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
        <table className="game-table">
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Rounds</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.player1name}</td>
                <td>{game.player2name}</td>
                <td>
                  {game.rounds.map((round, index) => (
                    <div key={index}>
                      <strong>{round.winner}</strong>: {round.player1Choice} vs {round.player2Choice}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameData;
