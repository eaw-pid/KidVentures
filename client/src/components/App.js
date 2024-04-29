import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Switch, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import Home from "../pages/Home";



function App() {

  const {currentUser} = useContext(UserContext)

  return (
      <div>
        
      
          <NavBar />
        <Outlet />
        
        {/* <Home /> */}
     
       
  
      </div>
    )
}

export default App;
