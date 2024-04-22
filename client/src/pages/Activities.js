import React, {useContext, useState, useEffect} from "react";
import ActivityList from "../components/ActivityList";
import ActivityForm from "../components/ActivityForm";
import ActivityCalendar from "../components/ActivityCalendar";
import { ActivityContext } from "../context/ActivityContext";
import { UserContext } from "../context/UserContext";
import { DateValueContext } from "../context/DateValueContext";


function Activities () {

    const {activities, setActivities} = useContext(ActivityContext)
    const {currentUser} = useContext(UserContext)
    const [clicked, setIsClicked] = useState(false)
    const {dateValue} = useContext(DateValueContext)


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


  
    const filteredActivities = dateValue.length > 0 ? activities.filter(act => act.start_time.slice(0, 10) === dateValue) : activities;

    
    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }

    const activityList = filteredActivities.map((activity) => (
            <ActivityList key={activity.id} activity={activity}  />
        ))

    if (!currentUser) {
        return null;
    }
 
    return(
        <div>
            <h1>Activities</h1> 
            <ActivityCalendar />
            <button onClick={handleClick}>Add An Activity</button>
            {clicked ? 
            <ActivityForm onAddActivity={onAddActivity}/> : null}
            {activityList}      
        </div>
    )
}

export default Activities