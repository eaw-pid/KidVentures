import React, {useContext, useState, useEffect} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext'
import { Form, Button, Row, Col } from 'react-bootstrap'

import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import ActivityFormTwo from './ActivityFormTwo';

function ActivityForm({onAddActivity}) {

    const {currentUser} = useContext(UserContext)
    const [activityDate, setActivityDate] = useState(new Date())
    const [newActivity, setNewActivity] = useState({})
    const [clicked, setIsClicked] = useState(false)


    const formOneSchema = yup.object().shape({
        title: yup.string().required("Title required"),
        description: yup.string().required('Description required'),
        location: yup.string().required('Location required'),
        street_one: yup.string().required('Street required'),
        city: yup.string().required('City required'),
        state: yup.string().required().min(2, 'Must be State abbreviation').max(2, 'Must be State abbreviation'),
        zip_code: yup.string().required().min(5, 'Zip must be 5 characters'),
    })

    function handleSubmitOne(values) {
        console.log(values)
        const IsoDate = activityDate.toISOString().slice(0, 19);
        const activity = {...values, start_time: IsoDate}
        fetch('/activities', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
       })
       .then(res => res.json())
       .then(data => {
            onAddActivity(data)
            setNewActivity(data)
            setIsClicked(true)})       
    }

    
    const formik1 = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
            street_one: "",
            street_two: "",
            city: "",
            state: "",
            zip_code: "",
            price: undefined,
            free: false,
            registration_link: "",
        },
        validationSchema: formOneSchema,
        onSubmit: (values) => {
            
            handleSubmitOne(values)}
    })

    
    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null}

    return (
       <div >
        <Form onSubmit={formik1.handleSubmit}>
            <h3>Add a New Activity</h3>
            <Row>
                <Form.Group as={Col}>

                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" value={formik1.values.title} onChange={formik1.handleChange}/>
                    {displayErrors(formik1.errors.title)}
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" name="description" value={formik1.values.description} onChange={formik1.handleChange}/>
                    {displayErrors(formik1.errors.description)}
                </Form.Group>
            </Row>
            <Row>
                <Form.Label>Location:</Form.Label>
                <Form.Control type="text" name="location" value={formik1.values.location} onChange={formik1.handleChange}/>
                {displayErrors(formik1.errors.location)}
            </Row>
            <Row>
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" name="street_one" value={formik1.values.street_one} onChange={formik1.handleChange}/>
                {displayErrors(formik1.errors.street_one)}
            </Row>
            <Row>
        
                <Form.Label>Address 2:</Form.Label>
                <Form.Control type="text" name="street_two" value={formik1.values.street_two} onChange={formik1.handleChange}/>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>City:</Form.Label>
                    <Form.Control type="text" name="city" value={formik1.values.city} onChange={formik1.handleChange}/>
                    {displayErrors(formik1.errors.city)}
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value={formik1.values.state} onChange={formik1.handleChange}/>
                    {displayErrors(formik1.errors.state)}
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Zipcode:</Form.Label>
                    <Form.Control type="text" name="zip_code" value={formik1.values.zip_code} onChange={formik1.handleChange}/>
                    {displayErrors(formik1.errors.zip_code)}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Price: $</Form.Label>
                    <Form.Control type="text" name="price" value={formik1.values.price} onChange={formik1.handleChange}/>
                </Form.Group>
                <Col xs="auto">
                    <Form.Check
                        type="checkbox"
                        className="mb-2"
                        name="free"
                        label="Free"
                        value="1" 
                        onChange={() => formik1.setFieldValue("free", 1)}>
                    </Form.Check>
                </Col>
                <Form.Group as={Col}>
                    <Form.Label>Registration Website</Form.Label>
                    <Form.Control type="text" name="registration_link" value={formik1.values.registration_link } onChange={formik1.handleChange}/>
                </Form.Group>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Date & Time</Form.Label>
                    <DateTimePicker 
                        type="datetime"
                        value={activityDate} 
                        onChange={(date) => {
                            setActivityDate(date)}}/>
                </Col>
            </Row>
            <Button type="submit">Next: Select Categories</Button>     
        </Form>
        {clicked ?
            <ActivityFormTwo newActivity={newActivity}/>     
        : null }
       </div> 
       
    )
}

export default ActivityForm

// {formik1.handleChange} checked={formik1.values.free === 1}

// <label>Start Time - Hour:</label>
// <input type="start_time_one" name="start_time_one" value={formik1.values.start_time_one} onChange={formik1.handleChange}/>
// <label>Start Time - Minutes:</label>
// <input type="start_time_two" name="start_time_two" value={formik1.values.start_time_two} onChange={formik1.handleChange}/>
// <label>AM/PM</label>
// <input type="am_pm" name="am_pm" value={formik1.values.am_pm} onChange={formik1.handleChange}/>


// const form1Schema = yup.object().shape({
    //     title: yup.string().required("Title required"),
    //     description: yup.string().required('Description required'),
    //     location: yup.string().required('Location required'),
    //     street_one: yup.string().required('Street required'),
    //     city: yup.string().required('City required'),
    //     state: yup.string.required().min(2, 'Must be State abbreviation').max(2, 'Must be State abbreviation'),
    //     zip_code: yup.string.required().min(5, 'Zip must be 5 characters'),
    //     month: yup.string.required('Must select a month'),
    //     day: yup.string.required('Must include a day'),
    //     year: yup.string.required().min(4, 'Must include a year'),
    //     start_time_one: yup.string.required(),
    //     string_time_two: yup.string.required(),
    //     am_pm: yup.string.required('Must choose AM or PM'),
    //     free: yup.string.required('Must select an option'),
    // })