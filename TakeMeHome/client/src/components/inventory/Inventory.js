
import { Card, CardBody } from "reactstrap";
import "../../App.css";
import { Link } from "react-router-dom";



const Inventory = ({ inventory }) => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const currentUserId = currentUser.id
    

  return (
    <Card className="m-4">      
    <CardBody>
        <div ><Link to={`/inventory/create/${inventory.id}/${inventory.inventory.name}`} className="row justify-content-center">{inventory.inventory.name}</Link></div>
    </CardBody>
  </Card>


    
  );
};

export default Inventory;