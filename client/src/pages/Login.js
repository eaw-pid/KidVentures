import React, { useContext } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


function Login() {

    const {login} = useContext(UserContext)
     const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup.string().required("Password required")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if(res.status === 200) {
                    res.json().then(userData => {
                        login(userData)
                        navigate('/activities')})
                } else {
                    res.json().then(data => console.log(data.error))
                }
            })
        }
    })

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null}
    
        return (
        <div className="Auth-form-container"> 
            <Form className="Auth-form"  onSubmit={formik.handleSubmit}>
                <div className="Auth-form-content">
                    <Form.Label className="Auth-form-title">Login</Form.Label>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" name="username" value={formik.values.username} onChange={formik.handleChange}/>
                            {displayErrors(formik.errors.username)}
                    </Form.Group>
                    <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formik.values.password} onChange={formik.handleChange}/>
                            {displayErrors(formik.errors.password)}
                    </Form.Group>  
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </div>

    )
}

export default Login