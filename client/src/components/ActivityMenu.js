import React, { useContext, useState } from 'react'
import { CategoryContext } from '../context/CategoryContext'
import {NavDropdown, NavItem, Nav, Button, Dropdown} from 'react-bootstrap';
 

function ActivityMenu({dropdown, setDropdown, freeClick, setFreeClick, handleCalendarClick, clicked, setIsClicked}) {

    const {categories} = useContext(CategoryContext)

    
    function handleFreeClick() {
        setFreeClick((freeClick) => !freeClick)
    }

    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }
    return (
        <div>
            <Nav fill variant="tabs" >                    
                <Nav.Item>
                    <Nav.Link onClick={handleClick}>Add An Activity</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={handleCalendarClick}>View Calendar</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item > */}
                <Dropdown   onSelect={(eventKey) => {
                    setDropdown(eventKey)
                    setFreeClick(false)}}>
                        <Dropdown.Toggle>Search By Category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item  eventKey="all">Search by Category</Dropdown.Item>
                            {categories.map((category) => (
                                <Dropdown.Item key={category.id} eventKey={category.type}>{category.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                {/* </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link type="radio" onClick={handleFreeClick}>{(!freeClick) ? "Free Activities" : "All Activities" }</Nav.Link>
                </Nav.Item>
        </Nav>
        </div>
    )
}

export default ActivityMenu