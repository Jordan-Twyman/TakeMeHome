import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";
import Inventory from "./Inventory";


const InventoryList = () => {
  const { inventory, getAllInventory, addInventory } = useContext(InventoryContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserName = currentUser.lastName;



  useEffect(() => {
    getAllInventory()  
  }, []);

  const handleClickSaveItem = (e) => {
    const item = inventory.find(i => i.id)
    addInventory({
      homeId:currentUser.id,
      inventoryId:item.id,
    })
  }

  return (
    <div className="inventory-list-container">
        <h1>Welcome Home, {currentUserName} Family</h1>
        <h2>Get Started by adding some items!</h2>
      <div className=" list">
        <div className="inventory">
          {inventory.map((i) => (
            <p key={i.id}>{i.name} <button className="btn btn-primary btn-secondary"
            onClick={handleClickSaveItem}> {<>Save Item</>}
            </button></p>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default InventoryList;