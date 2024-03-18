// HomePage.jsx
import React from 'react';
import '../style/HomePage.css'; // Import CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Conway's Game of Life</h1>
      <p className="intro">
        Conway's Game of Life is a cellular automaton devised by the mathematician John Horton Conway in 1970. The game is played on a two-dimensional grid, where each cell can be either alive or dead.
      </p>
      <p className="rules-heading">The rules of Conway's Game of Life are:</p>
      <ol className="rules-list">
        <li><strong>Birth:</strong> A dead cell with exactly three live neighbors becomes alive in the next generation, as if by reproduction.</li>
        <li><strong>Survival:</strong> A living cell with two or three live neighbors continues to live in the next generation.</li>
        <li><strong>Death by isolation:</strong> A living cell with fewer than two live neighbors dies due to underpopulation.</li>
        <li><strong>Death by overcrowding:</strong> A living cell with more than three live neighbors dies due to overpopulation.</li>
      </ol>
      <p className="explanation">
        These rules create dynamic patterns and behaviors in the grid, often leading to complex structures and evolutions. The game has no players in the traditional sense; its evolution is determined by its initial state, requiring no further input.
      </p>
    </div>
  );
};

export default HomePage;
