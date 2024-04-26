import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ActivityContext } from '../context/ActivityContext'
import { UserContext } from '../context/UserContext'
import { SingleActivityContext } from "../context/SingleActivityContext"
import MapComponent from "../components/MapComponent";


function ActivityDetail() {

    const {activities} = useContext(ActivityContext)
    const {currentUser} = useContext(UserContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const {singleActivity} = useContext(SingleActivityContext)
    // const [activity, setActivity] = useState({})
   
    
    
    console.log(singleActivity)

    function handleClick() {
        navigate('/activities')
    }

    if (!currentUser) {
        return null;
    }


    return (

        <div>
        <button onClick={handleClick}>Back to All Events</button>
        <h1>{singleActivity.title}</h1>
        <h3>Description: {singleActivity.description}</h3>
        <p>Address:</p>
        <p>{singleActivity.street_one}</p>
        <p>{singleActivity.city}, {singleActivity.state} {singleActivity.zip_code}</p>
        <p>Time: {singleActivity.date_converter}</p>
        {singleActivity.price ? 
        <p>Price: $ {singleActivity.price}</p>: null}
        <p>More Details: {singleActivity.registration_link}</p>
        <MapComponent />
        </div>
    )

}

export default ActivityDetail