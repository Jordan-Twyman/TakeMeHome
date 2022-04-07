import React, { useContext, useEffect } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import MyArea from "./MyArea";

const MyAreaList = () => {
  const { area, getMyAreas } = useContext(AreaContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser.id

  useEffect(() => {
    getMyAreas(currentUserId)
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {area.map((a) => (
            <MyArea key={a.id} myArea={a} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default MyAreaList;