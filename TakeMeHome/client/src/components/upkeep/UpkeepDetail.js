import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";

const UpkeepDetails = () => {
 
  const { getUpkeep, completeUpkeep } = useContext(UpkeepContext);
  const { id } = useParams();
  const [upkeep, setUpkeep] = useState();
  const navigate = useNavigate();



  useEffect(() => {
    getUpkeep(id).then(setUpkeep);
  }, []);

  const handleControlledInputChange = (e) => {
    const newUpkeep = { ...upkeep }
    newUpkeep[e.target.id] = e.target.value
    setUpkeep(newUpkeep)
}

  const handleComplete = (e) => {
    e.preventDefault();
    completeUpkeep({
        id:id,
        count: upkeep.count,
        cost: upkeep.cost
    }).then( () => navigate(`/upkeeps`))
  }


  if (!upkeep) {
    return null;
  }

  return (
      <>   
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Upkeep upkeep={upkeep} />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
    {upkeep.upkeep.description}</div>
    <div className="form-group">
                    <label htmlFor="cost">Associated Cost:</label>
                    <input value={upkeep.cost} type="number" id="cost" onChange={handleControlledInputChange} required  className="form-control" placeholder="cost"/>
                </div>
    </div>
    <button className="btn btn-secondary" onClick={handleComplete}>Completed</button>
      </div>
    </>
 
  );
};

export default UpkeepDetails;