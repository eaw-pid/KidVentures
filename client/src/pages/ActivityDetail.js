import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { SingleActivityContext } from "../context/SingleActivityContext"
import MapComponent from "../components/MapComponent";
import { Container } from 'react-bootstrap'
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

