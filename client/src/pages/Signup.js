import React, {useContext} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext'


function Signup() {


    const {login} = useContext(UserContext)

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password required")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if(res.status == 201) {
                    res.json().then(userData => login(userData))
                } else {
                    res.json().then(data => console.log(data.error))
                }
            })
           
        }
    })

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null}

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h3>Signup</h3>
                <label>Username</label>
                <input type="username" name="username" value={formik.values.username} onChange={formik.handleChange}/>
                {displayErrors(formik.errors.username)}
                <label>Email</label>
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                {displayErrors(formik.errors.email)}
                <label>Password</label>
                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange}/>
                {displayErrors(formik.errors.password)}
                <button type="submit">Submit</button>
            </form>
        </div>

    )

}

export default Signup