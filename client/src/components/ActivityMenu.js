import React, { useContext, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'


function ActivityMenu({dropdown, setDropdown}) {

    const {categories} = useContext(CategoryContext)

    console.log(dropdown)
    function handleClick() {
        setDropdown('Free')
    }

    return (
        <div>
            <select name="dropdown" value={dropdown} onChange={(e) => {
                                                setDropdown(e.target.value)}}>
                    <option value="all">Search by Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.type}>{category.type}</option>
                    ))}
            </select>
            <button type="radio" onClick={handleClick}>Free Activities</button>
        </div>
    )
}

export default ActivityMenu