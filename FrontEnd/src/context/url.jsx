import React, { createContext, useState } from "react";

export const UrlContext = createContext();

export const UrlContextProvider = ({ children }) => {
  const [url, setUrl] = useState('http://localhost:8080/');

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
