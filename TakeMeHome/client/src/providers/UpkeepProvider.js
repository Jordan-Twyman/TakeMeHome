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

const completeUpkeep = upkeep => {
    return fetch(`${apiUrl}/api/Upkeep/${upkeep.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(upkeep)
    })
  }

 

  return (
    <UpkeepContext.Provider value={{ getMyUpkeeps, upkeep, setUpkeep, getUpkeep, completeUpkeep  }}>
       {props.children}
    </UpkeepContext.Provider>
  );
}