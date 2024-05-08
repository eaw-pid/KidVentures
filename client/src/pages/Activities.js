import React, {useContext, useState, useEffect} from "react";
import ActivityList from "../components/ActivityList";
import ActivityForm from "../components/ActivityForm";
import ActivityCalendar from "../components/ActivityCalendar";
import ActivityMenu from "../components/ActivityMenu";
import BigCalendar from "../components/BigCalendar";
import { ActivityContext } from "../context/ActivityContext";
import { UserContext } from "../context/UserContext";
import { DateValueContext } from "../context/DateValueContext";
import { CategoryContext } from "../context/CategoryContext";
import { ReviewContext } from '../context/ReviewContext'
import { useNavigate } from "react-router-dom";
import {Container, Modal} from 'react-bootstrap';

function Activities () {

    const {activities, setActivities} = useContext(ActivityContext)
    const {currentUser} = useContext(UserContext)
    const [clicked, setIsClicked] = useState(false)
    const {dateValue} = useContext(DateValueContext)    
    // const {reviews, setReviews} = useContext(ReviewContext)
    const {categories, setCategories} = useContext(CategoryContext)
    const [dropdown, setDropdown] = useState("all")
    const [freeClick, setFreeClick] = useState(false)
    const [show, setShow] = useState(false)

    const navigate = useNavigate()
    let selectedCategory
    let filt_act


    useEffect(() => {
        fetch('/activities')
        .then(res => {
            if (res.status === 201) {
                res.json().then(data => {
                    setActivities(data)
                })
            }
        })

    }, [])

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

    

    function onAddActivity(newActivity) {
        setActivities([...activities, newActivity ])
    }

    if (dropdown !== 'all') {
        selectedCategory = categories.find((cat) => cat.type === dropdown);
      
        filt_act = activities.filter((ac) => {
          return ac.categories.filter(category => category.category_id === selectedCategory.id).length > 0;
        }).filter((ac) => {
            const startDate = new Date(ac.start_time);
            const currentDate = new Date()
            return startDate >= currentDate
        })
        if (freeClick) {
            filt_act = filt_act.filter((ac) => ac.free === true)
        }
        // .filter((ac) => => ac.free === True )
      } else {
        filt_act = activities.filter((ac) => {
            const startDate = new Date(ac.start_time);
    
            const currentDate = new Date()
            return startDate >= currentDate
        })
        if (freeClick) {
            filt_act = filt_act.filter((ac) => ac.free === true)
        }
      }

    

    function handleCalendarClick() {
        navigate('/calendar')
    }

    const activityList = filt_act.map((activity) => {
        // console.log(activity.reviews)
        //     setReviews(activity.reviews)
        //     console.log(reviews)
          return  <ActivityList key={activity.id} activity={activity}  />
})

    if (!currentUser) {
        return <h1>You must be logged in to view this page.</h1>;
    }
 
    return(
        <div className="activities-container">
            <ActivityMenu dropdown={dropdown} 
                setDropdown={setDropdown} 
                freeClick={freeClick} 
                setFreeClick={setFreeClick}
                handleCalendarClick={handleCalendarClick}
                clicked={clicked}
                setIsClicked={setIsClicked}
                setShow={setShow}/>
            {/* {clicked ?  */}
            <Modal show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <ActivityForm 
                        onAddActivity={onAddActivity}
                        setShow={setShow}/> 
            </Modal>
             
                {/* : null} */}
            <Container>
                 <h1 className="upcoming-activities">Upcoming Activities</h1> 
            </Container>
            <div className="activity-list">

              {activityList}      
            </div>
         
        </div>
    )
}

export default Activities


