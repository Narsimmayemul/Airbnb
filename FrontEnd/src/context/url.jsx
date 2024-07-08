import React, { createContext, useState } from "react";

export const UrlContext = createContext();

export const UrlContextProvider = ({ children }) => {
  const [url, setUrl] = useState('https://mine-wine.onrender.com/');

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
