import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { ActivityContext } from '../context/ActivityContext'

function ActivityDetail() {

    const {activities} = useContext(ActivityContext)
    const {id} = useParams()
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


    return (

        <>
        <h1>{activity.title}</h1>
        </>
    )

}

export default ActivityDetail