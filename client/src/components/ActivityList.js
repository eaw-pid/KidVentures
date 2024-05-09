import React, {useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate} from "react-router-dom";
import { ActivityContext } from "../context/ActivityContext";
import { SingleActivityContext } from "../context/SingleActivityContext"
import {Container, Col, Row, Card, Button, Form, Modal} from 'react-bootstrap';
import free from '../images/free.png'
import AddReviewForm from "./AddReviewForm";

function ActivityList({activity}) {

    const numOfReviews = ((activity.reviews).length)
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext)
    const {reviews} = activity
    const {activities, setActivities} = useContext(ActivityContext)
    const {setSingleActivity} = useContext(SingleActivityContext)
    const [reviewInput, setReviewInput] = useState("")
    const [editReviewId, setEditReviewId] = useState(null);
    const [show, setShow] = useState(false)

    console.log(currentUser)

    function handleReviewClick() {
        setShow(true)
    }


    function handleDeleteClick(review) {
        fetch(`/reviews/${review.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => {
            // Filter out the deleted review
            const updatedActivities = activities.map(activityItem => {
                if (activityItem.id === activity.id) {
                    // Update the reviews array excluding the deleted review
                    return {
                        ...activityItem,
                        reviews: activityItem.reviews.filter(r => r.id !== review.id)
                    };
                }
                return activityItem;
            });
            // Update the state with the modified activities
            setActivities(updatedActivities);
        })
        .catch(error => {
            console.error('Error deleting review:', error);
        });
    }


    function handleEditClick(review) {
        setEditReviewId(review.id);
        setReviewInput(review.comments)
    }

    function handleCloseReview() {
        setEditReviewId(null)
    }
   
    function handleInputChange(e) {
        setReviewInput(e.target.value);
    }
 

    function handleUpdateSubmit(review, e) {
        e.preventDefault()
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
                return res.json()
            } else {
                throw new Error('Failed to add review')
            }
        })
        .then((data) => {
            console.log(data)
            const updatedActivities = activities.map(activityItem => {
                if(activityItem.id === activity.id) {
                    //update the reviews array
                    return {
                        ...activityItem,
                        reviews: activityItem.reviews.map((r) => {
                            if (r.id === data.id) {
                                return data
                            } else {
                                return r
                            }
                        })
                    }
                }
                return activityItem
            })
            console.log(updatedActivities)
            setActivities(updatedActivities)
            setEditReviewId(null)
            
        })
       
    }

     const reviewList = reviews.map((review) => {
        return (
            <React.Fragment key={review.id}>
            <Card.Text >{"\"" + review.comments + "\" - " + review.user.username}
                {review.user.id === currentUser.id ? 
                <>
                <Button className="edit-review-button" onClick={() => handleEditClick(review)}>Edit</Button>
                <Button className="delete-review-button" onClick={() => handleDeleteClick(review)}>Delete</Button> 
                </>
                : null}
            </Card.Text>
            {editReviewId === review.id ? 
            <Form onSubmit={(e) => handleUpdateSubmit(review,e)}>
                <div className="form-header d-flex justify-content-between align-items-center">
                    <h4><strong>Edit your post:</strong></h4>
                    <Button onClick={handleCloseReview}>X</Button>
                </div>
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
            <Card className='mt-5 mb-5 pt-3 px-3'>
            <Row>
                <Col xs={8}>
                    <Card.Title onClick={handleClick}>{activity.title}</Card.Title>
                    <Card.Text><strong>Description:</strong>Description: {activity.description}</Card.Text>
                    
                    
            
                <Modal show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <AddReviewForm activity={activity} setShow={setShow} reviews={reviews}/>
                </Modal>
                    <Card.Footer>
                        <div className="d-flex justify-content-between align-items-center">
                            <Card.Title>Comments/Reviews: {numOfReviews}</Card.Title>
                            <button onClick={handleReviewClick}>Add a Review/Comment</button> 
                        </div>
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

    // function handleDeleteClick(review) {
    //     fetch(`/reviews/${review.id}`, {
    //         method: "DELETE",
    //     })
    //     .then(res => res.json())
    //     .then(() => {
    //         console.log(activities)
    //         
    //     }
    //         // window.location.reload()
    // )
    // }