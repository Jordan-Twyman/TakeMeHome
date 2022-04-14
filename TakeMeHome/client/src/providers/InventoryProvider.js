

import React, { useState, useEffect, createContext } from "react";


export const InventoryContext = createContext();

export const InventoryProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [inventory, setInventory] = useState([]);


  const getAllInventory = () => {
    return fetch(`${apiUrl}/api/Inventory`)
      .then((res) => res.json())
      .then(setInventory);
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
  }

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, addInventory, updateInventory, getInventoryById, getAllInventory  }}>
       {props.children}
    </InventoryContext.Provider>
  );
}