import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import {ActivityContext, activities, setActivities} from '../context/ActivityContext'
import { Form, Button } from 'react-bootstrap'

function AddReview({activity, setShow}) {

    const {currentUser} = useContext(UserContext)
    const {activities, setActivities} = useContext(ActivityContext)
    const [newReview, setNewReview] = useState([])
   
    function handleSubmit(e) {
        e.preventDefault()
   
        const newPost = {
            user_id: currentUser.id,
            activity_id: activity.id,
            comments: newReview
        }
        fetch('/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
        .then(res => {
            if (res.status === 201) {
                return res.json()
            } else {
                throw new Error('Failed to add review')
            }
        })
        .then((data) => {
            // console.log(data)
            const updatedActivities = activities.map(activityItem => {
                if (activityItem.id === activity.id) {
                    //Update the reviews array to add the new review
                    return {
                        ...activityItem,
                        reviews: [...activityItem.reviews, data]
                    };
                }
                return activityItem
            });
            // update state
            setActivities(updatedActivities)
            setShow(false)
        })
      
    }

  
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3>Add New Comment/Review</h3>
                    <button className="close-button" onClick= {() => setShow(false)}>X</button>
                </div>
                <Form.Label>Your Review/Comments</Form.Label>
                <Form.Control type="text" 
                    name="review" 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}/>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default AddReview


  // .then(res => {
        //     if (res.status === 201) {
        //         res.json().then((data) => {
        //             console.log(data)
        //             // window.location.reload()
        //             // setShow(false)
        //         })
        //     } else {
        //         res.json().then(data => console.log(data.error))
        //     }
        // }) 

        // .then(() => {
        //     // Filter out the deleted review
        //     const updatedActivities = activities.map(activityItem => {
        //         if (activityItem.id === activity.id) {
        //             // Update the reviews array excluding the deleted review
        //             return {
        //                 ...activityItem,
        //                 reviews: activityItem.reviews.filter(r => r.id !== review.id)
        //             };
        //         }
        //         return activityItem;
        //     });
        //     // Update the state with the modified activities
        //     setActivities(updatedActivities);
        // })