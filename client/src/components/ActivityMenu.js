import React, { useContext, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'


function ActivityMenu({dropdown, setDropdown, freeClick, setFreeClick}) {

    const {categories} = useContext(CategoryContext)

    
    function handleClick() {
        setFreeClick((freeClick) => !freeClick)
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