import React, { useContext, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import Upkeep from "./Upkeep";

const MyUpkeepList = () => {
  const { upkeep, getMyUpkeeps  } = useContext(UpkeepContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser.id

  useEffect(() => {
    getMyUpkeeps(currentUserId)
  }, []);


  
  

  return (
      <>
    <div className="container">
      <div className="row justify-content-center">
          
        <div className="cards-column-upkeeps">
          {upkeep.map((u) => (
            <Upkeep key={u.id} upkeep={u} />
          ))}
        </div>
      </div>
    </div>  

      </>
  
    
  );
};

export default MyUpkeepList;