import React, {useContext, useState, useEffect} from "react";
import { ReviewContext } from "../context/ReviewContext";
import { useNavigate, Link  } from "react-router-dom";
 

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const [clicked, setIsClicked] = useState(false)
    const navigate = useNavigate()

    const {reviews} = activity
    
     const reviewList = reviews.map((review) => (
        <p key={review.id}>{review.comments}</p>
    ))

    function handleClick() {
        console.log(activity)
        navigate(`/activities/${activity.id}`)
    }
    return (
        <div>
            <h3 onClick={handleClick}>{activity.title}</h3>
            <p>Description: {activity.description}</p>
            <p>Location: {activity.location}</p>
            <h4>Reviews: {numOfReviews}</h4><button>Add Review</button> 
            {reviewList}
        </div>
    )
}

export default ActivityList