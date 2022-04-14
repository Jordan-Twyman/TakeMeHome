import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AreaContext } from "../../providers/AreaProvider";
import Area from "./Area";

export const AreaSelect = () => {
  const { areaForSelect, getAllAreas, setSearchTerms, searchTerms } = useContext(AreaContext);
  const [ filteredItem, setFiltered ] = useState([])
  
  useEffect(() => {
    getAllAreas()
  }, []);

  useEffect(() => {
    if (searchTerms !== "" ) {
      const subset = areaForSelect.find(a => a.name === (searchTerms))
      setFiltered(subset)
    } 
  }, [searchTerms, areaForSelect])


  return (
    <><div className="container">
    <div className="row justify-content-center">
      
    </div>
  </div>

<div className="form-group">
<label htmlFor="location">Select Area </label>
<select name="locationId" id="animalLocation" onChange={(event) => setSearchTerms(event.target.value)} className="form-control">
<option value="0">Select an Area</option>
{areaForSelect.map(l => (
    <option key={l.id} value={l.name}>
  {l.name}
</option>
))}
</select>
<div className="cards-column-home">
        {filteredItem.inventoryItems?.map(i => <p key={i.id}><Link to={`/inventory/create/${i.id}/${i.name}`}>{i.name}</Link></p>)}
      </div></div></>
    
    
  );
};


