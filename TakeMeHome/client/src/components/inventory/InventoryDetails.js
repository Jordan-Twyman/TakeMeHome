import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";
import Inventory from "./Inventory";

const InventoryDetails = () => {
  const { updateInventory, getInventoryById} = useContext(InventoryContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { id } = useParams();
  const [idToEdit, setIdToEdit] = useState(0)

  const [inventory, setInventory] = useState({
        
    homeId:currentUser.id,
    inventoryId:id,
    brand:"",
    modelNumber:"" ,
    purchaseDate:""       
});

const onClickHandler = () => {
  setIdToEdit(id)
  setInventory(inventory)
}

const handleControlledInputChange = (event) => {
  const newInventory = {...inventory}
  newInventory[event.target.id] = event.target.value
  setInventory(newInventory)
}

const handleClickSaveItem = (e) => {
updateInventory({
  id: inventory.id,
  homeId:currentUser.id,
  inventoryId:id,
  brand:inventory.brand,
  modelNumber:inventory.modelNumber ,
  purchaseDate: inventory.purchaseDate === "" ? currentUser.constructedDate : inventory.purchaseDate
})
setIdToEdit(0)
            setInventory({})
            getInventoryById(id).then(() => { getInventoryById(id).then(setInventory)
            }) 
}


  useEffect(() => {
    getInventoryById(id).then(setInventory);
    debugger
  }, []);



  if (!inventory) {
    return null;
  }
  else  if (id === idToEdit) {
    return (      
      <>
      <form className="inventoryForm">
    <fieldset>
        <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input value={inventory.brand} type="text" id="brand" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="brand"/>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="modelNumber">Model Number:</label>
            <input value={inventory.modelNumber} type="text" id="modelNumber" onChange={handleControlledInputChange} required  className="form-control" placeholder="model#"/>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date:</label>
            <input value={inventory.purchaseDate} type="date" id="purchaseDate" onChange={handleControlledInputChange}   className="form-control"/>
        </div>
    </fieldset>  
       <button className="btn btn-primary btn-secondary"
onClick={handleClickSaveItem}> {<>Save Item</>}
</button> <button className="btn btn-danger" onClick={(() => (setIdToEdit(0)))}>Cancel</button>
</form> 
   <div className="col-sm-12 col-lg-6">
   {
       inventory.upkeeps?.map(u => {

          
              return (<ul className = "row justify-content-center">
                  <li key={u.id}> {u.title}: every {u.numberOfMonths} months</li>
              </ul>  )
      }
     )  
   }     
               </div> 
      </> 
          )
    
} else {    

  return (
      <>   
      <div className="container">
      
      <div className="row justify-content-center">
      
        <div className="col-sm-12 col-lg-6">
          
          <Inventory inventory={inventory} key={inventory.id}/>
         
        </div>
      </div>
      
    </div>
    <div className="container">
      <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-6">
    {
        inventory.upkeeps?.map(u => {

           
               return (<ul className = "row justify-content-center">
                   <li key={u.id}> {u.title}: every {u.numberOfMonths} months</li>
               </ul>  )
       }
      )  
    }     
     <div><button primary type="submit" className="btn btn-secondary justify-content-center" onClick={onClickHandler}>
            edit
            </button></div>
                </div>
                
    </div>
   
      </div>
    </>
 
  );
};
}

export default InventoryDetails;