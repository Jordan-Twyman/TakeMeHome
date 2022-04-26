import { months } from "moment";
import React, { useState, useEffect, createContext } from "react";


export const UpkeepContext = createContext();

export const UpkeepProvider =(props) =>{
    const [upkeep, setUpkeep] = useState([]);
    const [upkeepThisMonth, setUpkeepThisMonth] = useState([]);
    const apiUrl = "https://localhost:44372";



// const getMyUpkeeps = (homeId) => {
//     return fetch(`${apiUrl}/GetMyUpkeeps/${homeId}`)
//       .then((res) => res.json())
//       .then(setUpkeep);
//   };

  const getMyUpkeeps = (homeId) => {
    return fetch(`${apiUrl}/GetMyUpkeeps/${homeId}`)
      .then((res) => res.json())
      .then((parsedMonths) => {
        
        var monthArray = []
        parsedMonths.forEach(month => month.upkeepItems = [])
        
        for(let i = 0; i < parsedMonths.length; i++)
        {

          let itemWithUpkeeps = {
            
            name: parsedMonths[i].itemName,
            upkeeps: parsedMonths[i].upkeeps
          }

          parsedMonths[i].upkeepItems.push(itemWithUpkeeps)
          delete parsedMonths[i].upkeeps
          delete parsedMonths[i].itemName
          if(parsedMonths.filter( p => p.name === parsedMonths[i].name).length === 1)
          {
            monthArray.push(parsedMonths[i])
          } else {
          
            let existingMonthIndex = monthArray.findIndex(month => month.name === parsedMonths[i].name)
              // the first time we run into a month object, we won't have duplicates so this will return -1 because it's not found
            if(existingMonthIndex === -1){
              monthArray.push(parsedMonths[i])
            } else {
              monthArray[existingMonthIndex].upkeepItems = monthArray[existingMonthIndex].upkeepItems.concat(parsedMonths[i].upkeepItems)

            }
            
          }
          
         
        }
        setUpkeep(monthArray)

        
      } );
  };

  const getMyUpkeepsThisMonth = (homeId) => {
    return fetch(`${apiUrl}/GetMyUpkeepsThisMonth/${homeId}`)
      .then((res) => res.json())
      .then((parsedMonths) => {
        
        var thisMonthArray = []
        parsedMonths.forEach(month => month.upkeepItems = [])
        
        for(let i = 0; i < parsedMonths.length; i++)
        {

          let itemWithUpkeeps = {
            
            name: parsedMonths[i].itemName,
            upkeeps: parsedMonths[i].upkeeps
          }

          parsedMonths[i].upkeepItems.push(itemWithUpkeeps)
          delete parsedMonths[i].upkeeps
          delete parsedMonths[i].itemName
          if(parsedMonths.filter( p => p.name === parsedMonths[i].name).length === 1)
          {
            thisMonthArray.push(parsedMonths[i])
          } else {
          
            let existingMonthIndex = thisMonthArray.findIndex(month => month.name === parsedMonths[i].name)
              // the first time we run into a month object, we won't have duplicates so this will return -1 because it's not found
            if(existingMonthIndex === -1){
              thisMonthArray.push(parsedMonths[i])
            } else {
              thisMonthArray[existingMonthIndex].upkeepItems = thisMonthArray[existingMonthIndex].upkeepItems.concat(parsedMonths[i].upkeepItems)

            }
            
          }
          
         
        }
        setUpkeepThisMonth(thisMonthArray)

        
      } );
  };

  const getUpkeep = (id) => {
    return fetch(`${apiUrl}/api/Upkeep/${id}`).then((res) => res.json());
};

const completeUpkeep = upkeep => {
    return fetch(`${apiUrl}/api/Upkeep/${upkeep.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(upkeep)
    })
  }

 

  return (
    <UpkeepContext.Provider value={{ getMyUpkeeps, upkeep, setUpkeep, getUpkeep, completeUpkeep, getMyUpkeepsThisMonth, upkeepThisMonth, setUpkeepThisMonth  }}>
       {props.children}
    </UpkeepContext.Provider>
  );
}