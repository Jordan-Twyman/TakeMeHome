import React, { useContext, useEffect } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { UpkeepContext } from "../../providers/UpkeepProvider";
import MonthUpkeep from "./MonthUpkeep";
import Upkeep from "./Upkeep";
import moment from "moment";


const MyMonthlyUpkeepList = () => {
  const { upkeepThisMonth, getMyUpkeepsThisMonth } = useContext(UpkeepContext);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser.id
  const currentYear = new Date().now


  useEffect(() => {
    getMyUpkeepsThisMonth(currentUserId)
  }, []);








if (upkeepThisMonth.length > 0)
  return (
    <>
 
             <div className="container">
      <div className="row justify-content-center">
          
        <div className="cards-column-upkeeps">
          {upkeepThisMonth.map((u) => (
            <MonthUpkeep key={u.id} monthUpkeep={u} />
          ))}
        </div>
      </div>
    </div>  
 

    </>
  
    
  );
  else {
      return (
        <div className="container">
        <div className="row justify-content-center">
            
          <div className="cards-column-upkeeps">
          <h2 className="row justify-content-center welcome">Great Job, {currentUser.lastName} Family!   </h2>
          <h3 className="row justify-content-center welcome"> &#9786;</h3>
          <h3 className="row justify-content-center welcome"> There have no more upkeeps in {moment(currentYear).format('MMMM')}</h3>
          </div>
        </div>
      </div>  
      )
  }
};

export default MyMonthlyUpkeepList;