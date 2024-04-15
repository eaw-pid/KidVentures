import React, {useContext, useState, useEffect} from "react";
import { ReviewContext } from "../context/ReviewContext";

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const [clicked, setIsClicked] = useState(false)

    const {reviews} = activity
    
     const reviewList = reviews.map((review) => (
        <p key={review.id}>{review.comments}</p>
    ))
    return (
        <div>
            <h3>{activity.title}</h3>
            <p>Description: {activity.description}</p>
            <p>Location: {activity.location}</p>
            <h4>Reviews: {numOfReviews}</h4><button>Add Review</button> 
            {reviewList}
        </div>
    )
}

export default ActivityList