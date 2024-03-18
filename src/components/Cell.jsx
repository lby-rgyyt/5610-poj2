// import React,{ useState } from 'react';
// import { useAppContext } from './AppContext';
// import '../style/Cell.css'; // Import CSS file

// const Cell = ({ alive, onClick }) => {
//     const { isLongerLastingMode } = useAppContext();
//     const [isAlive, setIsAlive] = useState(alive);

//   const handleClick = () => {
//     onClick(); // Call the onClick function passed from the parent component
//   };

//   return (
//     <div
//       className={`cell ${alive ? 'alive' : 'dead'}`}
//       onClick={handleClick} // Attach handleClick function to onClick event
//     ></div>
//   );
// };

// export default Cell;

// Cell.js
import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import '../style/Cell.css'; // Import CSS file

const Cell = ({ lifespan, onClick }) => {
    const { isLongerLastingMode } = useAppContext();
    const [currentLifespan, setCurrentLifespan] = useState(lifespan);

    useEffect(() => {
        setCurrentLifespan(lifespan); // Update currentLifespan state when lifespan prop changes
    }, [lifespan]);

    const handleClick = () => {
        onClick(); // Call the onClick function passed from the parent component
    };

    return (
        <div
            // className={`cell ${currentLifespan > 0 ? 'alive' : 'dead'}`}
            className={`cell alive-${currentLifespan}`}
            onClick={handleClick} // Attach handleClick function to onClick event
        ></div>
    );
};

export default Cell;
