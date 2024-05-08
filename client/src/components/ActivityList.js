import React, {useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate} from "react-router-dom";
import { SingleActivityContext } from "../context/SingleActivityContext"
import {Container, Col, Row, Card, Button, Form, Modal} from 'react-bootstrap';
import free from '../images/free.png'
import AddReviewForm from "./AddReviewForm";

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {reviews} = activity
    const {setSingleActivity} = useContext(SingleActivityContext)
    const [reviewInput, setReviewInput] = useState("")
    const [editReviewId, setEditReviewId] = useState(null);
    const [show, setShow] = useState(false)


    function handleReviewClick() {
        setShow(true)
    }

    function handleDeleteClick(review) {
        fetch(`/reviews/${review.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => window.location.reload())
    }



    function handleEditClick(review) {
        console.log(review)
        setEditReviewId(review.id);
        setReviewInput(review.comments)
    }
   

    function handleInputChange(e) {
        setReviewInput(e.target.value);
    }
 

    function handleSubmit(review, e) {
        e.preventDefault()
        console.log(review.id)
        console.log('After submit:', reviewInput)
        const newComment = {
            comments: reviewInput
        }
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
        .then(res => {
            if (res.status === 200) {
                res.json().then(window.location.reload())
            }
        })
      
        setEditReviewId(null); // Clear the edit state after submission
    }

     const reviewList = reviews.map((review) => {
        // console.log(review.user.username)
        return (
            <React.Fragment key={review.id}>
            <Card.Text >{"\"" + review.comments + "\" - " + review.user.username}
                {review.user.id === currentUser.id ? 
                <>
                <Button onClick={() => handleEditClick(review)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(review)}>Delete</Button> 
                </>
                : null}
            </Card.Text>
            {editReviewId === review.id ? 
            <Form onSubmit={(e) => handleSubmit(review,e)}>
                <Form.Label>Edit</Form.Label>
                <Form.Control type="text"
                    name="review"
                    value={reviewInput}
                    onChange={handleInputChange}/>
                <Button type="submit">Submit</Button>
            </Form>
            : null}

            </React.Fragment>
        )
})

   

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
                <Col xs={8}>
                    <Card.Title onClick={handleClick}>{activity.title}</Card.Title>
                    <Card.Text><strong>Description:</strong>Description: {activity.description}</Card.Text>
                    
                    <button onClick={handleReviewClick}>Add Review</button> 
              
                <Modal show={show}>

                    <AddReviewForm activity={activity} setShow={setShow}/>
                </Modal>
       
                    <Card.Footer>
                    <Card.Title>Comments/Reviews: {numOfReviews}</Card.Title>
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