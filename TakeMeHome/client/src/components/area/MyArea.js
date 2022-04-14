import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "../../App.css";



const MyArea = ({ myArea }) => {

    const [isOpen, setIsOpen] = useState(false)


  return (
    <Card className="m-4">      
      <CardBody>
       <button type="button" key={myArea.id} className="collapsible" onClick={() => setIsOpen(!isOpen)}> {myArea.name}</button>
      <div className={isOpen ? 'd-flex justify-content-evenly flex-wrap' : 'content'}>
          {myArea.inventoryItems.map(i => < div className="img-with-text">{  i.name === 'Refrigerator' ? <img  src="fridge.png" alt="fridge" width="60" height="60" /> : ""}{  i.name === 'Range' ?<img  src="oven.png" alt="oven" width="60" height="60" /> : ""}{  i.name === 'Dishwasher' ?<img  src="dish-washer.png" alt="dishwasher" width="60" height="60" /> : ""}{  i.name === 'Kitchen Sink' ?<img  src="kitchen-sink.png" alt="kitchen sink" width="60" height="60" /> : ""}{  i.name === 'Kitchen Cabinets' ?<img  src="cabinet.png" alt="kitchen cabinet" width="60" height="60" /> : ""}{  i.name === 'Kitchen Countertops' ?<img  src="countertop.png" alt="kitchen countertop" width="60" height="60" /> : ""}{  i.name === 'Garbage Disposal' ?<img  src="rubbish.png" alt="garbage disposal" width="60" height="60" /> : ""}{  i.name === 'Wall Oven' ?<img  src="oven.png" alt="oven" width="60" height="60" /> : ""}{  i.name === 'Cooktop' ?<img  src="cooktop.png" alt="cooktop" width="60" height="60" /> : ""}{  i.name === 'Furnace' ?<img  src="furnace.png" alt="furnace" width="60" height="60" /> : ""}{  i.name === 'Boiler' ?<img  src="boiler.png" alt="boiler" width="60" height="60" /> : ""}{  i.name === 'Cieling Fan' ?<img  src="ceiling-fan.png" alt="ceiling-fan" width="60" height="60" /> : ""}{  i.name === 'Central AC' ?<img  src="air-conditioner.png" alt="AC" width="60" height="60" /> : ""}{  i.name === 'Electrical' ?<img  src="electrical-panel.png" alt="electrical-panel" width="60" height="60" /> : ""}{  i.name === 'Plubming' ?<img  src="plumbing.png" alt="plumbing" width="60" height="60" /> : ""}{  i.name === 'Ventilation' ?<img  src="ventilation.png" alt="ventilation" width="60" height="60" /> : ""}{  i.name === 'Gas Fireplace' ?<img  src="gas-fireplace.png" alt="gas-fireplace" width="60" height="60" /> : ""}{  i.name === 'Wood-burning Fireplace' ?<img  src="fireplace.png" alt="fireplace" width="60" height="60" /> : ""}{  i.name === 'Smoke Detectors' ?<img  src="smoke-detector.png" alt="smoke-detector" width="60" height="60" /> : ""}{  i.name === 'CO Detectors' ?<img  src="smoke-detector.png" alt="smoke-detector" width="60" height="60" /> : ""}{  i.name === 'Home Security' ?<img  src="cctv-camera.png" alt="cctv-camera" width="60" height="60" /> : ""}{  i.name === 'Washer' ?<img  src="washer.png" alt="washer" width="60" height="60" /> : ""}{  i.name === 'Dryer' ?<img  src="washer.png" alt="washer" width="60" height="60" /> : ""}{  i.name === 'Water Heater' ?<img  src="water-heater.png" alt="water-heater" width="60" height="60" /> : ""}{  i.name === 'Water Filtration' ?<img  src="water.png" alt="water" width="60" height="60" /> : ""}{  i.name === 'Water Softener' ?<img  src="water-filter.png" alt="water-filter" width="60" height="60" /> : ""}{  i.name === 'Generator' ?<img  src="electric-generator.png" alt="electric-generator" width="60" height="60" /> : ""}{  i.name === 'Roof' ?<img  src="roof.png" alt="roof" width="60" height="60" /> : ""}{  i.name === 'Gutters' ?<img  src="gutters.png" alt="gutters" width="60" height="60" /> : ""}{  i.name === 'Foundation' ?<img  src="foundation.png" alt="foundation" width="60" height="60" /> : ""}{  i.name === 'Siding' ?<img  src="wall.png" alt="wall" width="60" height="60" /> : ""}{  i.name === 'Windows' ?<img  src="window.png" alt="window" width="60" height="60" /> : ""}{  i.name === 'Front Door' ?<img  src="delivery.png" alt="delivery" width="60" height="60" /> : ""}{  i.name === 'Back Door' ?<img  src="delivery.png" alt="delivery" width="60" height="60" /> : ""}{  i.name === 'Sliding Door' ?<img  src="sliding-door.png" alt="sliding-door" width="60" height="60" /> : ""}{  i.name === 'Garage Door' ?<img  src="garage.png" alt="garage" width="60" height="60" /> : ""}{  i.name === 'Driveway' ?<img  src="driveway.png" alt="driveway" width="60" height="60" /> : ""}{  i.name === 'Walkway' ?<img  src="walkway.png" alt="walkway" width="60" height="60" /> : ""}{  i.name === 'Lawn' ?<img  src="grass.png" alt="grass" width="60" height="60" /> : ""}{  i.name === 'Deck' ?<img  src="patio.png" alt="patio" width="60" height="60" /> : ""}{  i.name === 'Patio' ?<img  src="patio.png" alt="patio" width="60" height="60" /> : ""}{  i.name === 'Fence' ?<img  src="fence.png" alt="fence" width="60" height="60" /> : ""}{  i.name === 'Trees' ?<img  src="nature.png" alt="nature" width="60" height="60" /> : ""}{  i.name === 'Plants' ?<img  src="plant.png" alt="plant" width="60" height="60" /> : ""}{  i.name === 'Toilet' ?<img  src="toilet.png" alt="toilet" width="60" height="60" /> : ""}{  i.name === 'Bathroom Sink' ?<img  src="bathroom-sink.png" alt="bathroom-sink" width="60" height="60" /> : ""}{  i.name === 'Bathroom Countertops' ?<img  src="countertop.png" alt="countertop" width="60" height="60" /> : ""}{  i.name === 'Showerhead' ?<img  src="shower.png" alt="shower" width="60" height="60" /> : ""}{  i.name === 'Bath/Shower Surround' ?<img  src="shower-surround.png" alt="shower-surround" width="60" height="60" /> : ""}{  i.name === 'Bathroom Fan' ?<img  src="fan.png" alt="fan" width="60" height="60" /> : ""}{  i.name === 'Hardwood Flooring' ?<img  src="wood-floor.png" alt="wood-floor" width="60" height="60" /> : ""}{  i.name === 'Carpet Flooring' ?<img  src="carpet.png" alt="carpet" width="60" height="60" /> : ""}{  i.name === 'Tile Flooring' ?<img  src="tile-floor.png" alt="tile-floor" width="60" height="60" /> : ""}{  i.name === 'Stone Floor' ?<img  src="walkway.png" alt="walkway" width="60" height="60" /> : ""}{  i.name === 'Vinyl/Laminate Flooring' ?<img  src="linoleum-floor.png" alt="vinyl floor" width="60" height="60" /> : ""}{  i.name === 'Linoleum Flooring' ?<img  src="linoleum-floor.png" alt="linoleum-floor" width="60" height="60" /> : ""} <p  className="p-2 bd-highlight" key={i.id}><Link to={`/inventory/details/${i.id}/`}> {i.name} </Link></p></div>)}
      </div>
      </CardBody>
    </Card>
  );
};

export default MyArea;