import React, {useContext, useState, useEffect} from "react";
import { ReviewContext } from "../context/ReviewContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link  } from "react-router-dom";
import { SingleActivityContext } from "../context/SingleActivityContext"
 

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {reviews} = activity
    const {setSingleActivity} = useContext(SingleActivityContext)
    
     const reviewList = reviews.map((review) => (
        <p key={review.id}>{review.comments}</p>
    ))

    function handleClick() {
        console.log(activity.id)
        fetch(`/activities/${activity.id}`)
        .then(res => {
            if(res.status == 200) {
                res.json().then(data => {
                    // console.log(data)
                    setSingleActivity(data)})
            } else {
                res.json().then(data => console.log(data.error))
            }}
        )
        navigate(`/activities/${activity.id}`)
    }
    return (
        <div>
            <h3 onClick={handleClick}>{activity.title}</h3>
            <p>Description: {activity.description}</p>
            <p>Location: {activity.location}</p>
            <p>Date/Time: {activity.date_converter}</p>
            <h4>Reviews: {numOfReviews}</h4><button>Add Review</button> 
            {reviewList}
            {activity.free ? 
            <p><strong>FREE</strong></p>: null}
        </div>
    )
}

export default ActivityList