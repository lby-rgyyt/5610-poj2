import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { useAppContext } from "./AppContext";

const Grid = ({ height, width }) => {
  const {
    isAutoplaying,
    toggleAutoplay,
    isLongerLastingMode,
    toggleLongerLastingMode,
  } = useAppContext();
  const [grid, setGrid] = useState([]);
  const [livingCells, setLivingCells] = useState(0);

  const [shouldResetGrid, setShouldResetGrid] = useState(true);

  useEffect(() => {
    if (shouldResetGrid) {
      const newGrid = [];
      let livingCount = 0;
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          const lifespan = Math.random() < 0.05 ? 1 : 0; // Initialize lifespan randomly
          let life = 0; // Initialize life attribute to 0 by default
          if (isLongerLastingMode) {
            life = lifespan === 0 ? 2 : 0; // Set life to 2 if isLongerLastingMode is true and lifespan is greater than 0
          } else {
            life = lifespan === 0 ? 1 : 0; // Set life to 1 otherwise
          }
          if (lifespan === 0) livingCount++;
          row.push({ lifespan, life }); // Add both lifespan and life attributes
        }
        newGrid.push(row);
      }
      setShouldResetGrid(false);
      setGrid(newGrid);
      setLivingCells(livingCount);
    }
    const updatedGrid = grid.map((row) =>
      row.map((cell) => {
        if (isLongerLastingMode) {
          return { ...cell, life: cell.lifespan === 0 ? 2 : 0 };
        } else {
          return { ...cell, life: cell.lifespan === 0 ? 1 : 0 };
        }
      })
    );
    setGrid(updatedGrid);
  }, [isLongerLastingMode]);

  useEffect(() => {
    const initializeGrid = () => {
      const newGrid = [];
      let livingCount = 0;
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          const lifespan = Math.random() < 0.05 ? 0 : 1; // Initialize lifespan randomly
          let life = 0; // Initialize life attribute to 0 by default
          if (isLongerLastingMode) {
            life = lifespan === 0 ? 2 : 0; // Set life to 2 if isLongerLastingMode is true and lifespan is greater than 0
          } else {
            life = lifespan === 0 ? 1 : 0; // Set life to 1 otherwise
          }
          if (lifespan > 0) livingCount++;
          row.push({ lifespan, life }); // Add both lifespan and life attributes
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
      setLivingCells(livingCount);
    };
    initializeGrid();
  }, [height, width]);

  useEffect(() => {
    if (isAutoplaying) {
      const interval = setInterval(() => progressSimulation(), 100);
      return () => clearInterval(interval);
    }
  }, [isAutoplaying, grid]);

  const toggleCellState = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j].lifespan = newGrid[i][j].lifespan !== 0 ? 0 : 1; // Toggle lifespan
    if (!newGrid[i][j].lifespan) {
      newGrid[i][j].life = isLongerLastingMode ? 2 : 1;
    }
    console.log(newGrid[i][j].life);
    setGrid(newGrid);
    setLivingCells(livingCells + (!newGrid[i][j].lifespan ? 1 : -1));
  };

  const resetGrid = () => {
    const newGrid = [];
    let livingCount = 0;
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const lifespan = Math.random() < 0.05 ? 0 : 1; // Initialize lifespan randomly
        let life = 0; // Initialize life attribute to 0 by default
        if (isLongerLastingMode) {
          life = lifespan === 0 ? 2 : 0; // Set life to 2 if isLongerLastingMode is true and lifespan is greater than 0
        } else {
          life = lifespan === 0 ? 1 : 0; // Set life to 1 otherwise
        }
        if (lifespan === 0) livingCount++;
        row.push({ lifespan, life }); // Add both lifespan and life attributes
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setLivingCells(livingCount);
  };

  //lifespan===0 means the cell is alive
  const progressSimulation = () => {
    let livingCount = 0;
    const newGrid = [];
    for (let i = 0; i < height; i++) {
      const newRow = [];
      for (let j = 0; j < width; j++) {
        let neighbors = countNeighbors(i, j);
        let newLifespan = grid[i][j].lifespan; // Use the lifespan attribute
        let newLife = grid[i][j].life; // Use the life attribute

        // Apply the rules of Conway's Game of Life

        if (grid[i][j].lifespan === 0) {
          if (neighbors < 2 || neighbors > 3) {
            if (newLife > 1) {
              newLife--; // Decrement life if the cell is still alive
            } else {
              newLifespan = 1; // Dies due to underpopulation or overpopulation
            }
          } else {
            newLife = isLongerLastingMode ? 2 : 1; // Reset life to 2 if the cell is still alive
          }
        } else {
          if (neighbors === 3) {
            newLifespan = 0; // Reproduction
          } else {
            newLifespan++; // Increment lifespan
            if (newLifespan > 10) {
              newLifespan = 10;
            }
          }
        }

        newRow.push({ life: newLife, lifespan: newLifespan }); // Preserve the life attribute
        if (newLifespan === 0) livingCount++;
      }
      newGrid.push(newRow);
    }
    console.log(newGrid);
    setGrid(newGrid);
    setLivingCells(livingCount);
  };

  const countNeighbors = (x, y) => {
    const deltas = [-1, 0, 1];
    let count = 0;

    for (let dx of deltas) {
      for (let dy of deltas) {
        if (dx === 0 && dy === 0) continue; // Skip the current cell
        const newX = x + dx;
        const newY = y + dy;
        if (
          newX >= 0 &&
          newX < height &&
          newY >= 0 &&
          newY < width &&
          grid[newX][newY].lifespan === 0
        ) {
          count++;
        }
      }
    }

    return count;
  };

  return (
    <div>
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                lifespan={cell.lifespan}
                life={cell.life}
                onClick={() => toggleCellState(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
      <div id="livingCellsDisplay">
        <span className="label">Living Cells:</span>
        <span id="livingCellsCount">{livingCells}</span>
      </div>
      <div>
        <button onClick={resetGrid}>Reset Grid</button>
        <button onClick={progressSimulation}>Next Frame</button>
        <button onClick={toggleAutoplay}>
          {isAutoplaying ? "Stop Autoplay" : "Start Autoplay"}
        </button>
        <button onClick={toggleLongerLastingMode}>
          {isLongerLastingMode
            ? "Disable Longer Lasting Mode"
            : "Enable Longer Lasting Mode"}
        </button>
      </div>
    </div>
  );
};

export default Grid;
