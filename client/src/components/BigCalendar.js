import React, { useContext } from "react";
import { Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { ActivityContext } from "../context/ActivityContext";

const localizer = momentLocalizer(moment)

function BigCalendar() {
    
    const navigate = useNavigate()
    const {activities} = useContext(ActivityContext)
    
    const events = activities.map((activity)=>{
        return {
          id: activity.id,
          title: activity.title,
          start: new Date(activity.start_time),
          end: new Date(activity.start_time),
          allDay: false
        }
      })

      console.log(events)

    function handleClick() {
        navigate('/activities')
    } 

    function handleSelected(event) {
        navigate(`/activities/${event.id}`)
    }

    console.log(activities)
    
    return (
        <div>
            <button onClick={handleClick}>Back to Activities</button>
            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelected}
                style={{ height: 550 }}
                />

        </div>
    )
}

export default BigCalendar