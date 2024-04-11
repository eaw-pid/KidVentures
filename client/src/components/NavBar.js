import React, {useContext } from "react";
import { NavLink } from 'react-router-dom'
import { UserContext } from "../context/UserContext";



function NavBar() {

    const {currentUser, logout} = useContext(UserContext)

    function handleClick() {
        logout()
    }
    return (

        <div>
            {!currentUser ?  <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
            </>
            : 
            <button type="button" onClick={handleClick}>Logout</button>
            }
        </div>
    )
}

export default NavBar