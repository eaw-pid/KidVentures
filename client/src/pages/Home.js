import React, {useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function Home () {

    const {currentUser} = useContext(UserContext)

    const navigate=useNavigate()

    function handleClick() {
        navigate('/signup')
    }

    if (currentUser) {
        return null;
    }

    return(
        <div className="homepage">
            
            <h1>A community for families to find and share upcoming events and activities in the area.</h1>
            <button onClick={handleClick}>Join KidVentures  </button>
        </div>
        
    )
}

export default Home