import React, { useContext, useEffect } from "react";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";

const MyUpkeepList = () => {
  const { upkeep, getMyUpkeeps } = useContext(UpkeepContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser.id

  useEffect(() => {
    getMyUpkeeps(currentUserId)
  }, []);

  

  return (
      <>
        <div className="container">
      <div className="row justify-content-center">
          
        <div className="cards-column">
          {upkeep.map((u) => (
            <Upkeep key={u.id} upkeep={u} />
          ))}
        </div>
      </div>
    </div>
    <aside> <div className="container">
      <div className="float-right"><div>{upkeep.upkeeps?.length}</div></div>
      </div></aside>
      </>
  
    
  );
};

export default MyUpkeepList;