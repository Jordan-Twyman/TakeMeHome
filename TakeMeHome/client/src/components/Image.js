import React, { useContext, useEffect } from "react";
import { AreaContext } from "../providers/AreaProvider";

export default function Images() {
    const { area, getAllAreas } = useContext(AreaContext);

    useEffect(() => {
        debugger
        getAllAreas()
      }, []);

  return (
      <div> {area.inventoryItems.map(i => <><div>{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""}{i.id === 1? <img src="fridge.png" alt="Girl in a jacket" width="100" height="100"></img>:""} </div>	</>)}   </div>
   
);
}