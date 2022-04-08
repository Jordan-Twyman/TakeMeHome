import React, { useState, useEffect, createContext } from "react";


export const UpkeepContext = createContext();

export const UpkeepProvider =(props) =>{
    const [upkeep, setUpkeep] = useState([]);
    const apiUrl = "https://localhost:44372";



const getMyUpkeeps = (homeId) => {
    return fetch(`${apiUrl}/GetMyUpkeeps/${homeId}`)
      .then((res) => res.json())
      .then(setUpkeep);
  };

  const getUpkeep = (id) => {
    return fetch(`${apiUrl}/api/Upkeep/${id}`).then((res) => res.json());
};

 

  return (
    <UpkeepContext.Provider value={{ getMyUpkeeps, upkeep, setUpkeep, getUpkeep  }}>
       {props.children}
    </UpkeepContext.Provider>
  );
}