import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "../../App.css";



const Area = ({ area }) => {

    const [isOpen, setIsOpen] = useState(false)
  return (
    <Card className="m-4">      
    <CardBody>
   
     <button type="button" className="collapsible" onClick={() => setIsOpen(!isOpen)}> {area.name}</button>
    <div className={isOpen ? 'd-flex justify-content-evenly flex-wrap content' : 'content'}>
        {area.inventoryItems.map(i => <Link to={`/inventory/create/${i.id}`} className="p-2 bd-highlight" key={i.id}> {i.name} </Link>)}
    </div>
    </CardBody>
  </Card>


    
  );
};

export default Area;