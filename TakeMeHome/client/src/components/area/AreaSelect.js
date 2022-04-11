import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AreaContext } from "../../providers/AreaProvider";
import Area from "./Area";

const AreaSelect = () => {
  const { area, getAllAreas, setSearchTerms, searchTerms } = useContext(AreaContext);
  const [ filteredItem, setFiltered ] = useState([])
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllAreas()
  }, []);

  useEffect(() => {
    setLoading(true)
    if (searchTerms !== "" ) {
      const subset = area.find(a => a.name === (searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(area)
    };
    
  }, [searchTerms, area])


  return (
    <><div className="container">
    <div className="row justify-content-center">
      
    </div>
  </div>

<div className="form-group">
<label htmlFor="location">Select Area </label>
<select name="locationId" id="animalLocation" onChange={(event) => setSearchTerms(event.target.value)} className="form-control">
<option value="0"></option>
{area.map(l => (
    <option key={l.id} value={l.name}>
  {l.name}
</option>
))}
</select>
<div className="cards-column">
        {filteredItem.inventoryItems?.map(i => <p><Link to={`/inventory/create/${i.id}/${i.name}`}>{i.name}</Link></p>)}
      </div></div></>
    
    
  );
};

export default AreaSelect;

