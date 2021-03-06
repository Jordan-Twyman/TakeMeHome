import React, { useState, useEffect, createContext } from "react";


export const HomeContext = createContext();

export const HomeProvider =(props) =>{

  const apiUrl = "https://localhost:44372";
  const [home, setHome] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);


  






  const login = (userObject) => {
    return fetch(`${apiUrl}/api/home/getbyemail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("user", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
   
      return  fetch(`${apiUrl}/api/home`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        sessionStorage.setItem("user", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
 

  };

  return (
    <HomeContext.Provider value={{ isLoggedIn, login, logout, register,
                                     currentUser, home, setHome  }}>
       {props.children}
    </HomeContext.Provider>
  );
}