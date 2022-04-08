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

  const getMyAreas = (homeId) => {
    return fetch(`${apiUrl}/GetMyAreas/${homeId}`)
      .then((res) => res.json())
      .then(setArea);
  };




  return (
    <AreaContext.Provider value={{ getAllAreas, area, setArea, getMyAreas   }}>
       {props.children}
    </AreaContext.Provider>
  );
}