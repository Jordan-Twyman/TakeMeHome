import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import { AreaSelect } from "./AreaSelect";
import MyArea from "./MyArea";

const MyAreaList = () => {
  const { area, getMyAreas } = useContext(AreaContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser.id
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const items = area.map(a => a.inventoryItems.map(i => i));  
  const totalItems = items.map(i => i.length).reduce((a, b) => a + b, 0)

  useEffect(() => {
    getMyAreas(currentUserId)
  }, []);

  return (
    <> <div className="container"> 
      <button type="button" className="btn btn-light" onClick={handleShow}><img src="add.png" alt="add" height="30" width="30"  /> 
</button><i> New Items</i>

    <div className="row justify-content-center">
    
      <div className="cards-column">
      <h2 className="row justify-content-center welcome">Welcome Home, {currentUser.lastName} Family</h2>
        {area.map((a) => (
          <MyArea key={a.id} myArea={a} />
        ))}
        <aside><p className="home-stats"> You have {totalItems} Items in your home</p></aside>
      </div>
      
    </div>
  
  </div>
  
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inventory Items</Modal.Title>
        </Modal.Header>
        <Modal.Body><AreaSelect /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

</>
   
    
  );
};

export default MyAreaList;