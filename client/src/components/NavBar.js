import React, {useContext } from "react";
import { NavLink } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function NavBar() {

    const {currentUser, logout} = useContext(UserContext)
    const navigate = useNavigate()

    function handleClick() {
        logout()
        navigate('/')
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