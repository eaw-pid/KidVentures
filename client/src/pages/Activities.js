import React, {useContext, useState, useEffect} from "react";
import ActivityList from "../components/ActivityList";
import ActivityForm from "../components/ActivityForm";
import { ActivityContext } from "../context/ActivityContext";
import { UserContext } from "../context/UserContext";



function Activities () {

    const {activities, setActivities} = useContext(ActivityContext)
    const {currentUser} = useContext(UserContext)
    const [clicked, setIsClicked] = useState(false)


    function onAddActivity(newActivity) {
        setActivities([...activities, newActivity ])
    }

    useEffect(() => {
        fetch('/activities')
        .then(res => {
            if (res.status == 201) {
                res.json().then(data => {
                    setActivities(data)
                })
            }
        })

    }, [])

    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }

    const activityList = activities.map((activity) => (
            <ActivityList key={activity.id} activity={activity}  />
        ))

    if (!currentUser) {
        return null;
    }
 
    return(
        <div>
            <h1>Activities</h1> 
            <button onClick={handleClick}>Add An Activity</button>
            {clicked ? 
            <ActivityForm onAddActivity={onAddActivity}/> : null}
            {activityList}      
        </div>
    )
}

export default Activities