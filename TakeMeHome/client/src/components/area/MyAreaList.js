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


  

  useEffect(() => {
    getMyAreas(currentUserId)
  }, []);

  return (
    <> <div className="container">
    <div className="row justify-content-center">
      <div className="cards-column">
        {area.map((a) => (
          <MyArea key={a.id} myArea={a} />
        ))}
      </div>
    </div>
    <Button variant="primary" onClick={handleShow}>
        New Item
      </Button>
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