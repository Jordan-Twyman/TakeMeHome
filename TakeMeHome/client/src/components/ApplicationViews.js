import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AreaProvider } from "../providers/AreaProvider";
import { HomeContext, HomeProvider } from "../providers/HomeProvider";
import { InventoryProvider } from "../providers/InventoryProvider";
import AreaList from "./area/AreaList";
import MyAreaList from "./area/MyAreaList";
import Login from "./authentication/Login";
import Register from "./authentication/Register";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(HomeContext);
  
    if (!isLoggedIn) {
      return (  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />      
        </Routes> 
      );
    }
    else{
     return(
        <HomeProvider>
        <AreaProvider>
        <InventoryProvider>
        <Routes>
            {/* <Route path="/" element={<Hello />} /> */}
            <Route path="/" element={ <MyAreaList /> } />
        </Routes>
        </InventoryProvider>
        </AreaProvider>            
        </HomeProvider>
  
  
     );
    }
  }