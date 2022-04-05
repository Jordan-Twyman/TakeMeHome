import React, { useState, useEffect, createContext } from "react";


export const AreaContext = createContext();

export const AreaProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [area, setArea] = useState([]);

const getAllAreas = () => {
    return fetch(`${apiUrl}/api/Area`)
      .then((res) => res.json())
      .then(setArea);
  };




  return (
    <AreaContext.Provider value={{ getAllAreas, area, setArea  }}>
       {props.children}
    </AreaContext.Provider>
  );
}