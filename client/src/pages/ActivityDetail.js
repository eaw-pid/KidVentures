import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { SingleActivityContext } from "../context/SingleActivityContext"
import MapComponent from "../components/MapComponent";
import { Container, Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap';


function ActivityDetail() {

    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const {singleActivity, setSingleActivity} = useContext(SingleActivityContext)
    const {id} = useParams()
    // console.log(singleActivity)


    useEffect(() => {
        fetch(`/activities/${id}`)
        .then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    console.log(data)
                    setSingleActivity(data)})
            }
        })
        
    }, [])

    function handleClick() {
        navigate('/activities')
    }

    if (!currentUser) {
        return null;
    }


    return (

        <div className="single-activities-container">
            <Container>
                <Button variant="outline-primary" size="lg" onClick={handleClick}>Back to All Events</Button>
                
                <Card className='mt-5 mb-5 pt-3 px-3'>
                    <Card.Title>{singleActivity.title}</Card.Title>
                    <Card.Text><strong>Description: </strong> {singleActivity.description}</Card.Text>
                    <Card.Body>

                        <Card.Text><strong>Address:</strong></Card.Text>
                        <Card.Text>{singleActivity.street_one}</Card.Text>
                        <Card.Text>{singleActivity.city}, {singleActivity.state} {singleActivity.zip_code}</Card.Text>
                        <Card.Text><strong>Time: </strong>{singleActivity.date_converter}</Card.Text>
                        {singleActivity.price ? 
                        <Card.Text><strong>Price:</strong> $ {singleActivity.price}</Card.Text>: null}
                        <Card.Text><strong>More Details: </strong> 
                            <a href={singleActivity.registration_link}>{singleActivity.registration_link}</a> 
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                         <MapComponent />
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    )

}

export default ActivityDetail

