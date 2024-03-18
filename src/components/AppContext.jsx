// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [isLongerLastingMode, setIsLongerLastingMode] = useState(false);

  const toggleAutoplay = () => {
    setIsAutoplaying(prevState => !prevState);
  };

  const toggleLongerLastingMode = () => {
    setIsLongerLastingMode(prevState => !prevState);
  };

  return (
    <AppContext.Provider value={{ isAutoplaying, toggleAutoplay, isLongerLastingMode, toggleLongerLastingMode }}>
      {children}
    </AppContext.Provider>
  );
};
