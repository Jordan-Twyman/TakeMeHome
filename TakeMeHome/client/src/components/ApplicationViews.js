import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AreaProvider } from "../providers/AreaProvider";
import { HomeContext, HomeProvider } from "../providers/HomeProvider";
import { InventoryProvider } from "../providers/InventoryProvider";
import { UpkeepProvider } from "../providers/UpkeepProvider";
import MyAreaList from "./area/MyAreaList";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import InventoryDetails from "./inventory/InventoryDetails";
import { InventoryForm } from "./inventory/InventoryForm";
import UpkeepDetails from "./upkeep/UpkeepDetail";
import MyUpkeepList from "./upkeep/UpkeepList";
import "../index.css";
import InventoryList from "./inventory/InventoryList";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(HomeContext);
  
    if (!isLoggedIn) {
      return ( 
    
        <div className="auth-wrapper">
        <div className="auth-inner"> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />      
        </Routes>
        </div> 
        </div>
      );
    }
    else{
     return(
        <HomeProvider>
        <AreaProvider>
        <InventoryProvider>
        <UpkeepProvider>
        <Routes>
            
            <Route path="/select" element={<InventoryList />} />
            <Route path="/upkeeps" element={ <MyUpkeepList /> } />
            <Route path="/upkeep/details/:id/*" element={ <UpkeepDetails /> } />
            <Route path="/" element={ <> <MyAreaList /></> } />
            <Route path="/inventory/create/:id/:name/*" element={ <InventoryForm /> } />
            <Route path="/inventory/details/:id/*" element={ <InventoryDetails /> } />
        </Routes>
        </UpkeepProvider>
        </InventoryProvider>
        </AreaProvider>            
        </HomeProvider>
     );
    }
  }