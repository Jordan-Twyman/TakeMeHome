import { Button, Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";
import Inventory from "./Inventory";
import { InventoryForm } from "./InventoryForm";


const InventoryList = () => {
  const { inventory, getAllInventory, addInventory } = useContext(InventoryContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserName = currentUser.lastName;
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
            <>    <p key={i.id}>{i.name}    <button type="button" className="btn btn-light" onClick={handleShow}>Add
            </button></p>
             <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
               <Modal.Title>Inventory Items</Modal.Title>
             </Modal.Header>
             <Modal.Body><InventoryForm /></Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                 Close
               </Button>
             </Modal.Footer>
           </Modal></>
        
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default InventoryList;