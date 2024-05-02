import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Form, Button, Row, Col } from 'react-bootstrap'

function AddReview({activity}) {

    const {currentUser} = useContext(UserContext)
    const [newReview, setNewReview] = useState([])
   

    function handleSubmit(e) {
        e.preventDefault()
   
        const newPost = {
            activity_id: activity.id,
            user_id: currentUser.id,
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
                res.json().then(() => window.location.reload())
            } else {
                res.json().then(data => console.log(data.error))
            }
        }) 
    }

  
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h3>Add New Comment/Review</h3>
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