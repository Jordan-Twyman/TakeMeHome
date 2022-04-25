import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";
import { Card, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import dishwasher from '../../img/dish-washer.png'


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
        <Card className="row justify-space-around">
                     < div className="img-with-text">{  upkeep.upkeep.inventory.name === 'Refrigerator' ? <img  src={require('../../img/fridge.png')} alt="fridge" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Range' ?<img  src= {require('../../img/oven.png')} alt="oven" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Dishwasher' ?<img  src={dishwasher} alt="dishwasher" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Kitchen Sink' ?<img  src={require('../../img/kitchen-sink.png')} alt="kitchen sink" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Kitchen Cabinets' ?<img  src={require('../../img/cabinet.png')} alt="kitchen cabinet" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Kitchen Countertops' ?<img  src={require('../../img/countertop.png')} alt="kitchen countertop" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Garbage Disposal' ?<img  src={require('../../img/rubbish.png')} alt="garbage disposal" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Wall Oven' ?<img  src={require('../../img/oven.png')} alt="oven" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Cooktop' ?<img  src={require('../../img/cooktop.png')} alt="cooktop" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Furnace' ?<img  src={require('../../img/furnace.png')} alt="furnace" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Boiler' ?<img  src={require('../../img/boiler.png')} alt="boiler" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Cieling Fan' ?<img  src={require('../../img/ceiling-fan.png')} alt="ceiling-fan" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Central AC' ?<img  src={require('../../img/air-conditioner.png')} alt="AC" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Electrical' ?<img  src={require('../../img/electrical-panel.png')} alt="electrical-panel" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Plubming' ?<img  src={require('../../img/plumbing.png')} alt="plumbing" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Ventilation' ?<img  src={require('../../img/ventilation.png')} alt="ventilation" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Gas Fireplace' ?<img  src={require('../../img/gas-fireplace.png')} alt="gas-fireplace" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Wood-burning Fireplace' ?<img  src={require('../../img/fireplace.png')} alt="fireplace" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Smoke Detectors' ?<img  src={require('../../img/smoke-detector.png')} alt="smoke-detector" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'CO Detectors' ?<img  src={require('../../img/smoke-detector.png')} alt="smoke-detector" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Home Security' ?<img  src={require('../../img/cctv-camera.png')} alt="cctv-camera" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Washer' ?<img  src={require('../../img/washer.png')} alt="washer" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Dryer' ?<img  src={require('../../img/washer.png')} alt="washer" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Water Heater' ?<img  src={require('../../img/water-heater.png')} alt="water-heater" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Water Filtration' ?<img  src={require('../../img/water.png')} alt="water" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Water Softener' ?<img  src={require('../../img/water-filter.png')} alt="water-filter" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Generator' ?<img  src={require('../../img/electric-generator.png')} alt="electric-generator" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Roof' ?<img  src={require('../../img/roof.png')} alt="roof" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Gutters' ?<img  src={require('../../img/gutters.png')} alt="gutters" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Foundation' ?<img  src={require('../../img/foundation.png')} alt="foundation" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Siding' ?<img  src={require('../../img/wall.png')} alt="wall" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Windows' ?<img  src={require('../../img/window.png')} alt="window" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Front Door' ?<img  src={require('../../img/delivery.png')} alt="delivery" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Back Door' ?<img  src={require('../../img/delivery.png')} alt="delivery" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Sliding Door' ?<img  src={require('../../img/sliding-door.png')} alt="sliding-door" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Garage Door' ?<img  src={require('../../img/garage.png')} alt="garage" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Driveway' ?<img  src={require('../../img/driveway.png')} alt="driveway" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Walkway' ?<img  src={require('../../img/walkway.png')} alt="walkway" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Lawn' ?<img  src={require('../../img/grass.png')} alt="grass" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Deck' ?<img  src={require('../../img/patio.png')} alt="patio" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Patio' ?<img  src={require('../../img/patio.png')} alt="patio" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Fence' ?<img  src={require('../../img/fence.png')} alt="fence" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Trees' ?<img  src={require('../../img/nature.png')} alt="nature" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Plants' ?<img  src={require('../../img/plant.png')} alt="plant" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Toilet' ?<img  src={require('../../img/toilet.png')} alt="toilet" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Bathroom Sink' ?<img  src={require('../../img/bathroom-sink.png')} alt="bathroom-sink" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Bathroom Countertops' ?<img  src={require('../../img/countertop.png')} alt="countertop" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Showerhead' ?<img  src={require('../../img/shower.png')} alt="shower" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Bath/Shower Surround' ?<img  src={require('../../img/shower-surround.png')} alt="shower-surround" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Bathroom Fan' ?<img  src={require('../../img/fan.png')} alt="fan" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Hardwood Flooring' ?<img  src={require('../../img/wood-floor.png')} alt="wood-floor" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Carpet Flooring' ?<img  src={require('../../img/carpet.png')} alt="carpet" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Tile Flooring' ?<img  src={require('../../img/tile-floor.png')} alt="tile-floor" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Stone Floor' ?<img  src={require('../../img/walkway.png')} alt="walkway" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Vinyl/Laminate Flooring' ?<img  src={require('../../img/linoleum-floor.png')} alt="vinyl floor" width="60" height="60" /> : ""}{  upkeep.upkeep.inventory.name === 'Linoleum Flooring' ?<img  src={require('../../img/linoleum-floor.png')} alt="linoleum-floor" width="60" height="60" /> : ""}</div>

          <h4><strong className="row justify-content-center">
    {upkeep.upkeep.inventory.name}</strong></h4>  <h2 className="row justify-content-center">
    {upkeep.upkeep.title}</h2>
    <p>   <em className="row justify-content-center">
    {upkeep.upkeep.description}</em></p>
     <div className="stat-container">{upkeep.cost !== 0 && upkeep.cost !== null ? <div className="m-4">
    <b>Lifetime Cost:</b>  &#36;{upkeep.cost}</div> :""}
    {upkeep.count !== 0 && upkeep.count !== null ? <div className="m-4">
    <b>Times Completed:</b> {upkeep.count}</div> :""}</div>
    
   </Card>
   <div> <Button className = "row justify-content-center m-4" variant="secondary" onClick={handleShow}>
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