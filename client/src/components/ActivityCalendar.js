import React, {useContext, useState} from "react";
import Calendar from "react-calendar";
import { DateValueContext } from "../context/DateValueContext";
import 'react-calendar/dist/Calendar.css';

function ActivityCalendar() {


    const {dateValue, setDateValue} = useContext(DateValueContext)
    
    function onChange(date) {
        setDateValue(date.toISOString().slice(0,10))
    }
    
    return (
        <>
    
            <Calendar 
            value={dateValue}
            onChange={onChange}/>
    
        </>
    )
}

export default ActivityCalendar