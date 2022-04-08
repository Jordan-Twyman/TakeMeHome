import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";

const UpkeepDetails = () => {
  const [upkeep, setUpkeep] = useState();
  const { getUpkeep } = useContext(UpkeepContext);
  const { id } = useParams();

  useEffect(() => {
    getUpkeep(id).then(setUpkeep);
  }, []);

 


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
    {upkeep.upkeep.description}
    </>
 
  );
};

export default UpkeepDetails;