
import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Area = ({ area }) => {
  return (
    <Card className="m-4">      
      <CardBody>
      <strong> {area.name}</strong>
      <ul>
          {area.inventoryItems.map(i => <li key={i.id}> {i.name} </li>)}
      </ul>
      </CardBody>
    </Card>
  );
};

export default Area;