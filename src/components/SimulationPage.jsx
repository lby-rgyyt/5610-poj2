import React, { useState } from 'react';
import Grid from './Grid';

const SimulationPage = () => {
    const [height, setHeight] = useState(20);
    const [width, setWidth] = useState(20);
    const [submittedHeight, setSubmittedHeight] = useState(20);
    const [submittedWidth, setSubmittedWidth] = useState(20);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = () => {
      if (height < 3 || height > 40 || width < 3 || width > 40) {
        setErrorMessage('Height and width must be between 3 and 40');
      } else {
        setSubmittedHeight(height);
        setSubmittedWidth(width);
        setErrorMessage('');
      }
    };
  
    return (
      <div className="app">
        <h1>Conway's Game of Life</h1>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            min="3"
            max="40"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            min="3"
            max="40"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button onClick={handleSubmit}>Submit</button>
        <Grid height={submittedHeight} width={submittedWidth} />
      </div>
    );
};

export default SimulationPage;


