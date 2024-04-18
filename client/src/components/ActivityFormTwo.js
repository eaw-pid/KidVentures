import React, {useContext, useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext'
import { CategoryContext } from '../context/CategoryContext'
import { useNavigate } from 'react-router-dom';



function ActivityFormTwo({newActivity}) {

    const {currentUser} = useContext(UserContext)
    const {categories, setCategories} = useContext(CategoryContext)
    const [firstCategory, setFirstCategory] = useState("")
    const [secondCategory, setSecondCategory] = useState("")
    const [addSecond, setAddSecond] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        fetch('/categories')
        .then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    setCategories(data)
                })
            }
        })
    }, [])


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
        .then(() => window.location.reload())
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

    return (
        <div>
            <h3>Select Categories</h3>
            <form onSubmit={formik2.handleSubmit}>
                <h4> 1st Category</h4>
                <select name="category" value={firstCategory} onChange={(e) => {
                                                console.log(e.target.value)
                                                setFirstCategory(e.target.value)}}>
                    <option>Select An Option</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.type}>{category.type}</option>
                    ))}
                 </select>
                <button type="button" onClick={handleClick}>Add Another Category</button>
                {addSecond ?
                <>
                <h4> 2nd Category</h4>
                <select name="category" value={secondCategory} onChange={(e) => {
                    console.log(e.target.value)
                    setSecondCategory(e.target.value)}}>
                    <option>Select An Option</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.type}>{category.type}</option>
                    ))}
                 </select>
                 </>
                 : null }
                <button type="submit">Done</button>
            </form>
        </div>

    )
}

export default ActivityFormTwo