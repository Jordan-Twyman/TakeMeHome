import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";
import { Card, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const UpkeepDetails = () => {
 
  const { getUpkeep, completeUpkeep } = useContext(UpkeepContext);
  const { id } = useParams();
  const [upkeep, setUpkeep] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getUpkeep(id).then(setUpkeep);
  }, []);

  const handleControlledInputChange = (e) => {
    const newUpkeep = { ...upkeep }
    newUpkeep[e.target.id] = e.target.value
    setUpkeep(newUpkeep)
}

  const handleComplete = (e) => {
    e.preventDefault();
    completeUpkeep({
        id:id,
        count: upkeep.count,
        cost: upkeep.cost
    }).then( () => navigate(`/upkeeps`))
  }

  


  if (!upkeep) {
    return null;
  }

  return (
      <>   
    <div className="container">
      <div className="row justify-content-center m-4">
        <Card className="row justify-space-around"><strong className="row justify-content-center">
    {upkeep.upkeep.inventory.name}</strong>  <strong className="row justify-content-center">
    {upkeep.upkeep.title}</strong>
        <em className="row justify-content-center">
    {upkeep.upkeep.description}</em>
    {upkeep.cost !== 0 && upkeep.cost !== null ? <div className="m-4">
    Lifetime Cost: {upkeep.cost}</div> :""}
   </Card>
   <div> <Button className = "row justify-content-center m-4" variant="primary" onClick={handleShow}>
        Ready to Complete?
      </Button></div>
    
    
      </div>
      </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upkeep</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="form-group">
                    <label htmlFor="cost">Upkeep Cost:</label>
                    <input  type="number" id="cost" onChange={handleControlledInputChange} required  className="form-control " placeholder="cost"/>
                </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleComplete}>
            Completed
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
 
  );
};

export default UpkeepDetails;