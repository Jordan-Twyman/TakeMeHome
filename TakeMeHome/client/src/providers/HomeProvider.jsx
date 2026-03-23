import React, { useState, createContext } from "react";


export const HomeContext = createContext();

export const HomeProvider =(props) =>{

  const apiUrl = "/api";
  const [home, setHome] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);


  






  const login = (userObject) => {
    return fetch(`${apiUrl}/home/GetByEmail?email=${encodeURIComponent(userObject.email)}`)
      .then((r) => {
        if (!r.ok) {
          if (r.status === 404) return null;
          throw new Error(`Login API request failed: ${r.status} ${r.statusText}`);
        }
        return r.json();
      })
      .then((userProfile) => {
        if (!userProfile || !userProfile.id) {
          return undefined;
        }
        sessionStorage.setItem("user", JSON.stringify(userProfile));
        setIsLoggedIn(true);
        return userProfile;
      });
  };

  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
   
      return  fetch(`${apiUrl}/home`, {
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