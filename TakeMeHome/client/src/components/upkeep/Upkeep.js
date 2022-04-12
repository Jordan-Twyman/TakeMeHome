import { Card, CardBody } from "reactstrap";
import "../../App.css";
import { Link } from "react-router-dom";
import moment from "moment";



const Upkeep = ({ upkeep }) => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const currentUserId = currentUser.id
   
   
  return (
    <div className="m-4">      
    <div>
        <div>{upkeep.name} {upkeep.year}</div>
        <strong>{upkeep.itemName}</strong>
        <div>{upkeep.upkeeps?.map(u => <Card ><p className="m-4"><Link to={`/upkeep/details/${u.id}`}>{u.upkeep.title}</Link> Due: {moment(u.scheduleDate).format('L')}</p></Card>)}</div>
    </div>
  </div>


    
  );
};

export default Upkeep;