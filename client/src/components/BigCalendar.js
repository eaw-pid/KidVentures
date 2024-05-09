import React, { useContext } from "react";
import { Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { ActivityContext } from "../context/ActivityContext";
import { SingleActivityContext } from "../context/SingleActivityContext";
import { Container } from "react-bootstrap";

const localizer = momentLocalizer(moment)

function BigCalendar() {
    
    const navigate = useNavigate()
    const {activities} = useContext(ActivityContext)
    const {setSingleActivity} = useContext(SingleActivityContext)
    
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
        fetch(`/activities/${event.id}`)
        .then(res => {
            if(res.status == 200) {
                res.json()
                .then(data => {
                    // console.log(data)
                    setSingleActivity(data)
                    navigate(`/activities/${event.id}`)
                    })
                    
            } else {
                res.json().then(data => console.log(data.error))
            }}
        )
    }

    console.log(activities)
    
    return (
        <div >
            <Container>

            <div className="calendar-button">
                <button onClick={handleClick}>Back to Activities</button>
            </div>
            <div className="calendar-container">
                <Calendar 
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleSelected}
                    style={{ height: 550 }}
                    />
            </div>
            </Container>

        </div>
    )
}

export default BigCalendar