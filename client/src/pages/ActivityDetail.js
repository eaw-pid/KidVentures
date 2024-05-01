import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { SingleActivityContext } from "../context/SingleActivityContext"
import MapComponent from "../components/MapComponent";
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap';


function ActivityDetail() {


    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const {singleActivity} = useContext(SingleActivityContext)
  
    console.log(singleActivity)

    function handleClick() {
        navigate('/activities')
    }

    if (!currentUser) {
        return null;
    }


    return (

        <div className="single-activities-container">
            <Container>
                <button  onClick={handleClick}>Back to All Events</button>
                
                <Card className='mt-5 mb-5'>
                    <Card.Title>{singleActivity.title}</Card.Title>
                    <Card.Text>Description: {singleActivity.description}</Card.Text>
                    <Card.Body>

                        <Card.Text><strong>Address:</strong></Card.Text>
                        <Card.Text>{singleActivity.street_one}</Card.Text>
                        <Card.Text>{singleActivity.city}, {singleActivity.state} {singleActivity.zip_code}</Card.Text>
                        <Card.Text><strong>Time: </strong>{singleActivity.date_converter}</Card.Text>
                        {singleActivity.price ? 
                        <Card.Text><strong>Price:</strong> $ {singleActivity.price}</Card.Text>: null}
                        <Card.Text><strong>More Details: </strong>{singleActivity.registration_link}</Card.Text>
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

// const {id} = useParams()