import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "../../App.css";



const MyArea = ({ myArea }) => {

    const [isOpen, setIsOpen] = useState(false)


  return (
    <Card className="m-4">      
      <CardBody>
     
       <button type="button" className="collapsible" onClick={() => setIsOpen(!isOpen)}> {myArea.name}</button>
      <div className={isOpen ? 'd-flex justify-content-evenly flex-wrap content' : 'content'}>
          {myArea.inventoryItems.map(i => <Link to={`/inventory/create/${i.id}/${i.name}`} className="p-2 bd-highlight" key={i.id}> {i.name} </Link>)}
      </div>
      </CardBody>
    </Card>
  );
};

export default MyArea;