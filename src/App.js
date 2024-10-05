// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from '../src/component/Game.js';
import GameData from './component/GameData.js';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/game-data" component={GameData} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
