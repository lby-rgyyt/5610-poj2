import React, { useState, useEffect } from "react";
import { useAppContext } from "./AppContext";
import "../style/Cell.css"; // Import CSS file

const Cell = ({ lifespan, life, onClick }) => {
  // Modify prop destructuring to include 'life'
  const { isLongerLastingMode } = useAppContext();
  const [currentLifespan, setCurrentLifespan] = useState(lifespan);
  const [currentLife, setCurrentLife] = useState(life); // Initialize 'life' state with prop value

  useEffect(() => {
    setCurrentLifespan(lifespan);
  }, [lifespan]);

  useEffect(() => {
    setCurrentLife(life); // Update 'life' state when 'life' prop changes
  }, [life]);

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`cell alive-${currentLifespan} life-${currentLife}`} // Update className to include 'life'
      onClick={handleClick}
    ></div>
  );
};

export default Cell;
