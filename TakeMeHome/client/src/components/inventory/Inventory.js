
import { Card, CardBody } from "reactstrap";
import "../../App.css";
import { Link } from "react-router-dom";
import moment from "moment";



const Inventory = ({ inventory }) => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const currentUserId = currentUser.id
   

  return (
    <Card className="m-4">      
    <CardBody>
        <h3 ><Link to={`/inventory/create/${inventory.id}/${inventory.inventory?.name}`} className="row justify-content-center">{inventory.inventory?.name}</Link></h3>
        
        <div className="inventory-info">
        {inventory.brand !== "" ? <div><b>Brand:</b> {inventory.brand}</div> :<i>Edit to add brand info</i>}
        {inventory.modelNumber !== "" ? <div><b>Model Number:</b> {inventory.modelNumber}</div>: ""}
        {inventory.purchaseDate !== "" ?<div><b>Purchase Date:</b> {moment(inventory.purchaseDate).format('L')}</div> : ""}
        </div>
    </CardBody>
  </Card>


    
  );
};

export default Inventory;