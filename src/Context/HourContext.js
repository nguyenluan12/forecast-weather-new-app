import React, { createContext, useState, useContext } from 'react';


const HourContext = createContext();

export const HourProvider = ({ children }) => {
    const [hour, setHour] = useState(null);

    return (
    <HourContext.Provider value={{ hour, setHour }}>
      {children}
    </HourContext.Provider>
    );
};

export const useHour = () => {
    return useContext(HourContext);
};
