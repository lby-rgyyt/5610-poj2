import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { useAppContext } from './AppContext';

const Grid = ({ height, width }) => {
  const { isAutoplaying, toggleAutoplay, isLongerLastingMode, toggleLongerLastingMode } = useAppContext();
  const [grid, setGrid] = useState([]);
  const [livingCells, setLivingCells] = useState(0);
  //const intervalRef = useRef(null);

  useEffect(() => {
    const initializeGrid = () => {
      const newGrid = [];
      let livingCount = 0;
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          const lifespan = Math.random() < 0.05 ? 1 : 0; // Initialize lifespan randomly
          if (lifespan > 0) livingCount++;
          row.push(lifespan);
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
      setLivingCells(livingCount);
    };
    initializeGrid();
  }, [height, width]);

  useEffect(() => {
    // const handleAutoplay = () => {
    //   if (isAutoplaying) {
    //     intervalRef.current = setInterval(progressSimulation, 1000);
    //   } else {
    //     clearInterval(intervalRef.current);
    //   }
    // };
  
    // handleAutoplay();
  
    // return () => clearInterval(intervalRef.current);
    if(isAutoplaying){
        const interval = setInterval(()=>progressSimulation(),1000);
        return ()=> clearInterval(interval);
    }
  }, [isAutoplaying]);

  const toggleCellState = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0; // Toggle lifespan
    setGrid(newGrid);
    setLivingCells(
      livingCells + (newGrid[i][j] ? 1 : -1)
    );
  };

  const resetGrid = () => {
    const newGrid = [];
    let livingCount = 0;
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const lifespan = Math.random() < 0.05 ? 1 : 0; // Initialize lifespan randomly
        if (lifespan > 0) livingCount++;
        row.push(lifespan);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setLivingCells(livingCount);
  };

  const progressSimulation = () => {
    let livingCount = 0;
    const newGrid = [];
    
    for (let i = 0; i < height; i++) {
      const newRow = [];
      for (let j = 0; j < width; j++) {
        let neighbors = undefined;
        if (!isLongerLastingMode){
            neighbors = countNeighbors(i, j);
        }else{
            neighbors = countNeighborsLongerLasting(i, j);
        }
        let newLifespan = grid[i][j]; // Default to current lifespan
  
        // Apply the rules of Conway's Game of Life
        if (grid[i][j] > 0) {
          if (neighbors < 2 || neighbors > 3) {
            newLifespan = 0; // Dies due to underpopulation or overpopulation
          } else {
            newLifespan++; // Increment lifespan
            if(newLifespan>10){
                newLifespan=10;
            }
          }
        } else {
          if (neighbors === 3) {
            newLifespan = 1; // Reproduction
          }
        }
  
        newRow.push(newLifespan);
        if (newLifespan > 0) livingCount++;
      }
      newGrid.push(newRow);
    }
    console.log(newGrid);
    setGrid(newGrid);
    setLivingCells(livingCount);
  };

  const countNeighborsLongerLasting = (x, y) => {
    const deltas = [-2, -1, 0, 1, 2];
    let count = 0;
  
    for (let dx of deltas) {
      for (let dy of deltas) {
        if (dx === 0 && dy === 0) continue; // Skip the current cell
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < height && newY >= 0 && newY < width && grid[newX][newY] > 0) {
          count++;
        }
      }
    }
  
    return count;
  };

  const countNeighbors = (x, y) => {
    const deltas = [-1, 0, 1];
    let count = 0;
  
    for (let dx of deltas) {
      for (let dy of deltas) {
        if (dx === 0 && dy === 0) continue; // Skip the current cell
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < height && newY >= 0 && newY < width && grid[newX][newY] > 0) {
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
            {row.map((lifespan, j) => (
              <Cell
                key={`${i}-${j}`}
                lifespan={lifespan}
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
        <button onClick={toggleAutoplay}>{isAutoplaying ? 'Stop Autoplay' : 'Start Autoplay'}</button>
        <button onClick={toggleLongerLastingMode}>{isLongerLastingMode ? 'Disable Longer Lasting Mode' : 'Enable Longer Lasting Mode'}</button>
      </div>
    </div>
  );
};

export default Grid;
