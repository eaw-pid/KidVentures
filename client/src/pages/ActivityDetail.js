import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ActivityContext } from '../context/ActivityContext'


function ActivityDetail() {

    const {activities} = useContext(ActivityContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [activity, setActivity] = useState({})
   
    
    
    useEffect(() => {
        fetch(`/activities/${id}`)
        .then(res => {
            if(res.status == 200) {
                res.json().then(data => {
                    console.log(data)
                    setActivity(data)})
            } else {
                res.json().then(data => console.log(data.error))
            }}
        )
    }, [])

    function handleClick() {
        navigate('/activities')
    }

    return (

        <div>
        <button onClick={handleClick}>Back to All Events</button>
        <h1>{activity.title}</h1>
        <h3>Description: {activity.description}</h3>
        <p>Address:</p>
        <p>{activity.street_one}</p>
        <p>{activity.city}, {activity.state} {activity.zip_code}</p>
        <p>Time: {activity.date_converter}</p>
        {activity.price ? 
        <p>Price: $ {activity.price}</p>: null}
        
        </div>
    )

}

export default ActivityDetail