

import React, { useState, useEffect, createContext } from "react";


export const InventoryContext = createContext();

export const InventoryProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [inventory, setInventory] = useState([]);

const getInventoryByHomeId = (homeId) => {
    return fetch(`${apiUrl}/GetHomeInventory?homeId=${homeId}`)
    .then((r) => r.json())
  };


  const addInventory = (inventory) => {
    return fetch(`${apiUrl}/api/Inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    })
  };

  return (
    <InventoryContext.Provider value={{ getInventoryByHomeId, inventory, setInventory, addInventory  }}>
       {props.children}
    </InventoryContext.Provider>
  );
}