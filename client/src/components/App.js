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
        <h1>KidVentures Home Page</h1>
      
          <NavBar />
        <Outlet />
        {!currentUser ? 
        <Home />
      : null }
       
  
      </div>
    )
}

export default App;
