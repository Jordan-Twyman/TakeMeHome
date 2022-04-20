import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";
import Inventory from "./Inventory";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import moment from "moment";


const InventoryDetails = () => {
  const { updateInventory, getInventoryById} = useContext(InventoryContext);
  const { upkeep, getMyUpkeeps } = useContext(UpkeepContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { id, name } = useParams();
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
getInventoryById(id)
            
}


  useEffect(() => {
    getInventoryById(id).then(setInventory).then(getMyUpkeeps(currentUser.id));
  }, []);



  if (!inventory) {
    return null;
  }
  else  if (id === idToEdit) {
    return (      
      <>
            <div className="containerAll">
      <div className="form-container">
      <form className="inventoryForm w-50">
    <fieldset>
        <div className="form-group ">
          <Card><h3 className="row justify-content-center">The {currentUser.lastName}'s {name}</h3></Card>
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
</div> 
   {
       inventory.upkeeps?.map(u =>  { 

          
              return (<div gap={10} className="col-md-5 mx-auto">
                  <Card body gap={3} className="bg-light border" key={u.id}> <h3>{u.title}</h3> {u.numberOfMonths !== 12 ? `every ${u.numberOfMonths} months` : "annually"} </Card>
              </div>  )
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
            <button primary type="submit" className="btn btn-secondary row justify-content-center" style={{'margin-left':'45%'}} onClick={onClickHandler}>
            edit
            </button> 
        </div>
      </div>
      
    </div>
    <div className="container">
   {
       inventory.upkeeps?.map(u =>  { 

          
              return (<div gap={10} className="col-md-5 mx-auto">
                  <Card body gap={3} className="bg-light border" key={u.id}> <h3>{u.title}</h3> {u.numberOfMonths !== 12 ? `every ${u.numberOfMonths} months` : "annually"} </Card>
              </div>  )
      }
     )  
   }        
     
                
    </div>
   
    </>
 
  );
};
}

export default InventoryDetails;