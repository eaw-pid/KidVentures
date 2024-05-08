import React, {useContext, useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext'
import { CategoryContext } from '../context/CategoryContext'
import { useNavigate } from 'react-router-dom';
import { Form, Dropdown, Button, Row, Col } from 'react-bootstrap'


function ActivityFormTwo({newActivity, setShow}) {

    const {currentUser} = useContext(UserContext)
    const {categories} = useContext(CategoryContext)
    const [firstCategory, setFirstCategory] = useState("")
    const [secondCategory, setSecondCategory] = useState("")
    const [addSecond, setAddSecond] = useState(false)
    const navigate = useNavigate()


    function handleSubmitTwo() {
        // console.log(firstCategory, secondCategory  )
        const category1 = categories.find((cat) => cat.type == firstCategory)

        // console.log(newActivity, category1, category2)
       

        const newActivityCategory1 = {
            activity_id: newActivity.id,
            category_id: category1.id
        }

                
        fetch('activity-categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivityCategory1)
       })
        .then(res => {
                if(res.status == 201) {
                    return res.json()
                }})
        .then(() => {
            if (secondCategory) {
                return postNewActivityCategory2()
            } 
            // navigate('/activities')
            window.location.reload()
    })

    function postNewActivityCategory2() {
        const category2 = categories.find((cat) => cat.type == secondCategory)
       

        const newActivityCategory2 = {
            activity_id: newActivity.id,
            category_id: category2.id
        }

        fetch('activity-categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivityCategory2)
       })
        .then(res => {
                if(res.status == 201) {
                    return res.json()
                }})
        .then(() => {
            setShow(false)
            window.location.reload()})
        .catch(error => console.log(error))
    }
    }

    const formTwoSchema = yup.object().shape({
        category: yup.string().required("Selection required"),
    })
    const formik2 = useFormik({
        initialValues: {
            category: "",
        },
        // validationSchema: formTwoSchema,
        onSubmit: handleSubmitTwo
    })

    function handleClick() {
        setAddSecond((addSecond) => !addSecond)
    }
    console.log(firstCategory)
    return (
        <div className="form-two">
            <Form onSubmit={formik2.handleSubmit}>
            <Form.Label >Select Categories</Form.Label>
                <h4> 1st Category</h4>
                <Dropdown name="category" onSelect={(eventKey) => {
                    console.log(eventKey)
                    setFirstCategory(eventKey)
                    setAddSecond(true)}}>
                    <Dropdown.Toggle>Select An Option</Dropdown.Toggle>
                    <Dropdown.Menu>

                        {categories.map((category) => (
                            <Dropdown.Item key={category.id} eventKey={category.type}>{category.type}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                 </Dropdown>
                <button type="button" onClick={handleClick}>Add Another Category</button>
                {addSecond ?
                <>
                <h4> 2nd Category</h4>
                <Dropdown name="category" onSelect={(eventKey) => {
                    console.log(eventKey)
                    setSecondCategory(eventKey)
                    }}>
                    <Dropdown.Toggle>Select An Option</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categories.map((category) => (
                            <Dropdown.Item key={category.id} eventKey={category.type}>{category.type}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                 </Dropdown>
                 </>
                 : null }
                <button type="submit">Done</button>
            </Form>
        </div>

    )
}

export default ActivityFormTwo