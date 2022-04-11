import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";
import Inventory from "./Inventory";

const InventoryDetails = () => {
 
  const { getInventoryById } = useContext(InventoryContext);
  const { id } = useParams();
  const [inventory, setInventory] = useState();



  useEffect(() => {
    getInventoryById(id).then(setInventory);
    debugger
  }, []);



  if (!inventory) {
    return null;
  }

  return (
      <>   
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Inventory inventory={inventory} key={id}/>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-6">
    {
        inventory.upkeeps.map(u => {

           
               return (<ul className = "row justify-content-center">
                   <li key={u.id}> {u.title}: every {u.numberOfMonths} months</li>
               </ul>  )
       }
      )  
    }     
                </div>
    </div>
      </div>
    </>
 
  );
};

export default InventoryDetails;