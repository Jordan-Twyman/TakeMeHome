import { Card, CardBody } from "reactstrap";
import "../../App.css";
import { Link } from "react-router-dom";
import moment from "moment";



const MonthUpkeep = ({ monthUpkeep }) => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const currentUserId = currentUser.id
    const singleItem = monthUpkeep.upkeepItems?.map((item, index) => {
return (
  <div key={index}>
    <h4>{item.name}</h4>
    {item.upkeeps?.map((c, i) => (
      <div key={i}>
        <p><p className="m-4"><Link to={`/upkeep/details/${c.id}`}>{c.upkeep.title}</Link> Due: {moment(c.scheduleDate).format('L')}</p></p>
        <hr />
      </div>
    ))}
  </div>
)

    })

  
  return (
    <div className="m-4">      
    <div>
        <div><h3>{monthUpkeep.name} <small>{monthUpkeep.year}</small></h3> </div>
        <div>{singleItem}</div>
    </div>
  </div>


    
  );
};

export default MonthUpkeep;