import moment from "moment";
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";

export const InventoryForm = () => {
const {addInventory} = useContext(InventoryContext);
const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { id, name } = useParams()



    const [inventory, setInventory] = useState({
        
        homeId:currentUser.id,
        inventoryId:id,
        brand:"",
        modelNumber:"" ,
        purchaseDate:""       
    });

    const navigate = useNavigate();

    const handleControlledInputChange = (e) => {
        const newInventory = { ...inventory }
        newInventory[e.target.id] = e.target.value
        setInventory(newInventory)
    }

    const handleClickSaveItem = (e) => {
        e.preventDefault();
        const currentItemId = parseInt(inventory.inventoryId)
        const inventoryList = currentUser.inventory?.map(h => h.inventoryId)
        debugger
        console.log(inventoryList)
        if(inventoryList.includes(currentItemId))
        {
            window.alert("You already have this item!");
        }
        else{
            debugger
        addInventory({
        
            homeId:currentUser.id,
            inventoryId:id,
            brand:inventory.brand,
            modelNumber:inventory.modelNumber ,
            purchaseDate: inventory.purchaseDate === "" ? currentUser.purchaseDate : inventory.purchaseDate       
        }).then(() => navigate('/'));
    }          
    }

    return (
        <form className="inventoryForm">
            <h2 className="postForm_title">{name}</h2>
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
            <button className="btn btn-primary"
        onClick={handleClickSaveItem}>
        Save Item
      </button>
        </form>
    )
}