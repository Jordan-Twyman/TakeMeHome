import moment from "moment";
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { InventoryContext } from "../../providers/InventoryProvider";

export const InventoryForm = () => {
const {addInventory} = useContext(InventoryContext);
const currentUser = JSON.parse(sessionStorage.getItem("user"));
const { id } = useParams()



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

    const handleClickSavePost = (e) => {
        e.preventDefault();
        // var date = inventory.purchaseDate;
        // var formatted = moment(date).format('L LTS');
        debugger
        addInventory({
            homeId:currentUser.id,
            inventoryId:id,
            brand: inventory.brand,
            modelNumber: inventory.modelNumber,
            purchaseDate: inventory.purchaseDate
        }).then(() => navigate('/'));   
        
    }

    return (
        <form className="inventoryForm">
            <h2 className="postForm_title">New Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Brand:</label>
                    <input value={inventory.brand} type="text" id="brand" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="title"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="caption">Model Number:</label>
                    <input value={inventory.modelNumber} type="text" id="modelNumber" onChange={handleControlledInputChange} required  className="form-control" placeholder="caption"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Purchase Date:</label>
                    <input value={inventory.purchaseDate} type="date" id="purchaseDate" onChange={handleControlledInputChange}   className="form-control" placeholder="image"/>
                </div>
            </fieldset>
            <button className="btn btn-primary"
        onClick={handleClickSavePost}>
        Save Post
      </button>
        </form>
    )
}