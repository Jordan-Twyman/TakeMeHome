import React, { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../providers/AreaProvider";
import Area from "./Area";

const AreaSelect = () => {
  const { area, getAllAreas, setSearchTerms, searchTerms } = useContext(AreaContext);
  const [ filteredItems, setFiltered ] = useState([])
  useEffect(() => {
    getAllAreas()
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = area.map(a => a.inventoryItems.map(i => i.area.name.includes(searchTerms)))
      setFiltered(subset)
    } else {
      setFiltered(area)
    }
  }, [searchTerms, area])

  return (
    <><div className="container">
    <div className="row justify-content-center">
      <div className="cards-column">
        {area.map((a) => (
          <Area key={a.id} area={a} />
        ))}
      </div>
    </div>
  </div>

<div className="form-group">
<label htmlFor="location">Assign to location: </label>
<select name="locationId" id="animalLocation" onChange={(event) => setSearchTerms(event.target.value)} className="form-control">
<option value="0">Select Area</option>
{area.map(l => (
    <option key={l.id} value={l.id}>
  {l.name}
</option>
))}
</select>
<div>{filteredItems.map(i => <p>{i.name}</p>)}</div>
</div></>
    
    
  );
};

export default AreaSelect;

