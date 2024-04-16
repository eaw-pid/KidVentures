import React, {useContext, useState} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'

function ActivityForm() {

    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [activityDate, setActivityDate] = useState(new Date())

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
            // month: "",
            // day: "",
            // year: "",
            // start_time_one: "",
            // start_time_two: "",
            // am_pm: "",
            price: "",
            free: "",
            registration_link: "",
            // datetime: new Date()
        }
    })

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null}

    return (
       <div>
        <form>
            <h3>Add a New Activity</h3>
            <label>Title:</label>
            <input type="username" name="username" value={formik1.values.title} onChange={formik1.handleChange}/>
            <label>Description:</label>
            <input type="description" name="description" value={formik1.values.title} onChange={formik1.handleChange}/>
            <label>Location:</label>
            <input type="location" name="location" value={formik1.values.location} onChange={formik1.handleChange}/>
            <label>Address:</label>
            <input type="street_one" name="street_one" value={formik1.values.street_one} onChange={formik1.handleChange}/>
            <label>Address 2:</label>
            <input type="street_twp" name="street_two" value={formik1.values.street_two} onChange={formik1.handleChange}/>
            <label>City:</label>
            <input type="city" name="city" value={formik1.values.city} onChange={formik1.handleChange}/>
            <label>State</label>
            <input type="state" name="state" value={formik1.values.state} onChange={formik1.handleChange}/>
            <label>Zipcode:</label>
            <input type="zip_code" name="zip_code" value={formik1.values.zip_code} onChange={formik1.handleChange}/>
        
            <label>Price:</label>
            <input type="price" name="price" value={formik1.values.price} onChange={formik1.handleChange}/>
            <label>Free</label>
            <input type="free" name="free" value={formik1.values.free} onChange={formik1.handleChange}/>
            <label>Registration Website</label>
            <input type="registration_link" name="registration_link" value={formik1.values.registration_link } onChange={formik1.handleChange}/>
            <label>Date/Time</label>
            <DateTimePicker value={activityDate} onChange={(date) => setActivityDate(date)}/>
            
        </form>
       </div> 
    )
}

export default ActivityForm


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