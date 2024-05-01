import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";




function App() {

  const {currentUser} = useContext(UserContext)

  return (
      <div>
          <NavBar />
          <Outlet />
      </div>
    )
}

export default App;
