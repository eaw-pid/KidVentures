import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Switch, Route } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import NavBar from "./NavBar";



function App() {

  return (
      <div>
        <h1>KidVentures Home Page</h1>
        <UserProvider>
          <NavBar />
        <Outlet />
        </UserProvider>
  
      </div>
    )
}

export default App;
