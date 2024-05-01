import React, {useContext, useState, useEffect} from "react";
import { ReviewContext } from "../context/ReviewContext";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link  } from "react-router-dom";
import { SingleActivityContext } from "../context/SingleActivityContext"
import {Container, Col, Row, Card} from 'react-bootstrap';
import free from '../images/free.png'

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {reviews} = activity
    const {setSingleActivity} = useContext(SingleActivityContext)
    
     const reviewList = reviews.map((review) => (
        <Card.Text key={review.id}>{"\"" + review.comments + "\""}</Card.Text>
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
                    navigate(`/activities/${activity.id}`)
                    })
                    
            } else {
                res.json().then(data => console.log(data.error))
            }}
        )
        
    }

    return (
        <div >
           <Container>
            <Card className='mt-5 mb-5'>

            <Row>
                <Col>
                    <Card.Title onClick={handleClick}>{activity.title}</Card.Title>
                    <Card.Text>Description: {activity.description}</Card.Text>
                    <button onClick={handleReviewClick}>Add Review</button> 
                    <Card.Footer>
                    <Card.Title>Reviews: {numOfReviews}</Card.Title>
                        {reviewList}
                    </Card.Footer>
                </Col>
                <Col >
                    <Card.Text><strong>Location:</strong> {activity.location}</Card.Text>
                    <Card.Text><strong>Date/Time: </strong>{activity.date_converter}</Card.Text>
                    {activity.free ? 
                    <img src={free}/>: null}
            
                </Col>
            </Row>
            </Card>

           </Container>
        </div>
    )
}

export default ActivityList