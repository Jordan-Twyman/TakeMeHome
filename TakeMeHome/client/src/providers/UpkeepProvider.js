import { months } from "moment";
import React, { useState, useEffect, createContext } from "react";


export const UpkeepContext = createContext();

export const UpkeepProvider =(props) =>{
    const [upkeep, setUpkeep] = useState([]);
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
        debugger
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
          // console.log("this should be parsed months with arr of objects", parsedMonths)
          // console.log(itemArray)
          // console.log("this is the parsedMonths[i]", parsedMonths[i], "and this is what comes back from the filter to see if that month is already in the list", parsedMonths.filter( p => p.name === parsedMonths[i].name))
          if(parsedMonths.filter( p => p.name === parsedMonths[i].name).length === 1)
          {
            monthArray.push(parsedMonths[i])
          } else {
          
            let existingMonthIndex = monthArray.findIndex(month => month.name === parsedMonths[i].name)
              // the first time we run into a month object, we won't have duplicates so this will return -1 because it's not found
            if(existingMonthIndex === -1){
              monthArray.push(parsedMonths[i])
            } else {
              console.log("this should be october from the monthsArray", monthArray[existingMonthIndex])
              console.log("this should be october's upkeep items", monthArray[existingMonthIndex].upkeepItems)
              console.log("this should be the SECOND october's inventory upkeep items that we're trying to concat", parsedMonths[i].upkeepItems)
              monthArray[existingMonthIndex].upkeepItems = monthArray[existingMonthIndex].upkeepItems.concat(parsedMonths[i].upkeepItems)

              // console.log("this is the month array after concat",monthArray[existingMonthIndex])
            }
            
          }
          debugger
         
        }
        setUpkeep(monthArray)

        // 
        // loop through all the upkeeps
        // for every upkeep, you would assign an array of inventoryItems and push the inventoryItems into it
        // inside the loop, we we'd want to check if the month property is anywhere else in the array
        // If so, we want to combine

        const exampleData = [
          {
            "name": "july",
            "inventoryName": "diswasher",
            "upkeeps": []
          },
          {
            "name": "july",
            "inventoryName": "roof",
            "upkeeps": []
          },
        ]


        const whatWeWantInstead = [
          {
            name: "july",
            inventoryItems: [
              {
                name: "fridge",
                upkeeps: []
              },
              {
                name: "fence",
                upkeeps: []
              }
            ]
          }
        ]
        // const upkeeps = parsedUpkeeps.map(u => u.upkeeps.map(u => u))
        
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
    <UpkeepContext.Provider value={{ getMyUpkeeps, upkeep, setUpkeep, getUpkeep, completeUpkeep  }}>
       {props.children}
    </UpkeepContext.Provider>
  );
}