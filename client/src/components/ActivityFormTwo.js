import React, {useContext, useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/UserContext'
import { CategoryContext } from '../context/CategoryContext'


function ActivityFormTwo({newActivity}) {

    const {currentUser} = useContext(UserContext)
    const {categories, setCategories} = useContext(CategoryContext)
    const [firstCategory, setFirstCategory] = useState(null)
    const [secondCategory, setSecondCategory] = useState(null)
    const [thirdCategory, setThirdCategory] = useState(null)

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


    function handleSubmitTwo(values) {
        console.log(newActivity, values  )
        const category = categories.find((cat) => cat.type == values.category)

        const newActivityCategory = {
            activity_id: newActivity.id,
            category_id: category.id
        }
        fetch('activity-categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newActivityCategory)
       })
       .then(res => res.json())
       .then(data => {
                console.log(data)
            // onAddActivity(data)
            // setNewActivity(data)
        })
    }

    const formTwoSchema = yup.object().shape({
        category: yup.string().required("Selection required"),
    })

    const formik2 = useFormik({
        initialValues: {
            category: "",
        },
        validationSchema: formTwoSchema,
        onSubmit: (values) => setFirstCategory(values)
       

    })

    function handleClick() {

    }
    return (
        <div>
            <h3>Select Categories</h3>
            <form onSubmit={formik2.handleSubmit}>
                <h4>Category</h4>
                <select name="category" value={formik2.values.category} onChange={formik2.handleChange}>
                    <option>Select An Option</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.type}>{category.type}</option>
                    ))}
                 </select>
                <button onClick={handleClick}>Add Another Category</button>
                <button type="submit">Done</button>
            </form>
        </div>

    )
}

export default ActivityFormTwo