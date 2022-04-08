

import React, { useState, useEffect, createContext } from "react";


export const InventoryContext = createContext();

export const InventoryProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [inventory, setInventory] = useState([]);

const getInventoryByHomeId = (homeId) => {
    return fetch(`${apiUrl}/GetHomeInventory?homeId=${homeId}`)
    .then((r) => r.json())
  };

  const getInventoryById = (id) => {
    return fetch(`${apiUrl}/api/Inventory/${id}`).then((res) => res.json());
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

  const updateInventory = inventory => {
    return fetch(`${apiUrl}/api/Inventory/${inventory.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inventory)
    })
      .then(getInventoryByHomeId)
  }

  return (
    <InventoryContext.Provider value={{ getInventoryByHomeId, inventory, setInventory, addInventory, updateInventory, getInventoryById  }}>
       {props.children}
    </InventoryContext.Provider>
  );
}