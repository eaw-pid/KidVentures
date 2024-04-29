import React, {useContext, useState, useEffect} from "react";
import { ReviewContext } from "../context/ReviewContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link  } from "react-router-dom";
import { SingleActivityContext } from "../context/SingleActivityContext"
import {Container, Col, Row} from 'react-bootstrap';
 

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {reviews} = activity
    const {setSingleActivity} = useContext(SingleActivityContext)
    
     const reviewList = reviews.map((review) => (
        <p key={review.id}>{review.comments}</p>
    ))

    function handleReviewClick() {
        console.log(activity)
    }

    function handleClick() {
        fetch(`/activities/${activity.id}`)
        .then(res => {
            if(res.status == 200) {
                res.json()
                .then(data => {
                    // console.log(data)
                    setSingleActivity(data)
                    })
                    navigate(`/activities/${activity.id}`)
            } else {
                res.json().then(data => console.log(data.error))
            }}
        )
        
    }

    return (
        <div>
           <Container>
            <Row>
                <Col>
                    <h3 onClick={handleClick}>{activity.title}</h3>
                    <p>Description: {activity.description}</p>
                    <h4>Reviews: {numOfReviews}</h4><button onClick={handleReviewClick}>Add Review</button> 
                    {reviewList}
                </Col>
                <Col >
                    <p>Location: {activity.location}</p>
                    <p>Date/Time: {activity.date_converter}</p>
                    {activity.free ? 
                    <p><strong>FREE</strong></p>: null}
                </Col>
            </Row>

           </Container>
        </div>
    )
}

export default ActivityList