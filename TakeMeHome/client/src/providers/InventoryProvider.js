

import React, { useState, useEffect, createContext } from "react";


export const InventoryContext = createContext();

export const InventoryProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [inventory, setInventory] = useState([]);

const getInventoryByHomeId = (homeId) => {
    return fetch(`${apiUrl}/GetHomeInventory?homeId=${homeId}`)
    .then((r) => r.json())
  };




  return (
    <InventoryContext.Provider value={{ getInventoryByHomeId, inventory, setInventory  }}>
       {props.children}
    </InventoryContext.Provider>
  );
}