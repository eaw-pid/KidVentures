import React, {useContext, useEffect} from "react";
import { UserContext } from "../context/UserContext";



function Home () {

    const {currentUser} = useContext(UserContext)

    if (currentUser) {
        return null;
    }
    
    return(
        <div>
            
            <h1>KidVentures</h1>
        </div>
        
    )
}

export default Home