import React, {useContext} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'


function ActivityForm() {

    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()

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
            month: "",
            day: "",
            year: "",
            start_time_one: "",
            start_time_two: "",
            am_pm: "",
            price: "",
            free: "",
            registration_link: ""
        }
    })

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null}

    return (
       <div>
        <form>
            <h3>Add a New Activity</h3>
            <label>Title:</label>
            <input type="username" name="username" value={formik1.values.title} unChange={formik1.handleChange}/>
            <label>Description:</label>
            <input type="description" name="description" value={formik1.values.title} unChange={formik1.handleChange}/>
            <label>Location:</label>
            <input type="location" name="location" value={formik1.values.location} unChange={formik1.handleChange}/>
            <label>Address:</label>
            <input type="street_one" name="street_one" value={formik1.values.street_one} unChange={formik1.handleChange}/>

        </form>
       </div> 
    )
}

export default ActivityForm