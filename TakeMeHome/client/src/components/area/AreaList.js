import React, { useContext, useEffect } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import Area from "./Area";

const AreaList = () => {
  const { area, getAllAreas } = useContext(AreaContext);

  useEffect(() => {
    getAllAreas()
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {area.map((a) => (
            <Area key={a.id} area={a} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default AreaList;