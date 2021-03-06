import React, { useState, useEffect, createContext } from "react";


export const AreaContext = createContext();

export const AreaProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [area, setArea] = useState([]);
  const [areaForSelect, setAreaForSelect] = useState([]);
  const [ searchTerms, setSearchTerms ] = useState("");

const getAllAreas = () => {
    return fetch(`${apiUrl}/api/Area`)
      .then((res) => res.json())
      .then(setAreaForSelect);
  };

  const getMyAreas = (homeId) => {

    return fetch(`${apiUrl}/GetMyAreas/${homeId}`)
      .then((res) => res.json())
      .then(setArea);
  };




  return (
    <AreaContext.Provider value={{ getAllAreas, area, setArea, getMyAreas, setSearchTerms, searchTerms, areaForSelect, setAreaForSelect   }}>
       {props.children}
    </AreaContext.Provider>
  );
}