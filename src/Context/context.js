import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());

    return (
        <DataContext.Provider value={{ date, setDate }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
