
import { Card, CardBody } from "reactstrap";
import moment from "moment";
import "../../App.css";
import { Link } from "react-router-dom";



const Upkeep = ({ upkeep }) => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const currentUserId = currentUser.id
    var date = upkeep.scheduleDate;
    var formatted = moment(date).format('L');

  return (
    <Card className="m-4">      
    <CardBody>
        <div>{upkeep.upkeep.inventory.name}</div>
        <div><Link to={`/upkeep/details/${upkeep.id}`}>{upkeep.upkeep.title}</Link></div>
        <div>{formatted}</div>
    </CardBody>
  </Card>


    
  );
};

export default Upkeep;