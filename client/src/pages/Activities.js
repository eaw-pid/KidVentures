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
import { ActCategoryContext } from "../context/ActivityCategoryContext";
import { useNavigate } from "react-router-dom";

function Activities () {

    const {activities, setActivities} = useContext(ActivityContext)
    const {currentUser} = useContext(UserContext)
    const [clicked, setIsClicked] = useState(false)
    const {dateValue} = useContext(DateValueContext)    
    const {categories, setCategories} = useContext(CategoryContext)
    const {actCategories} = useContext(ActCategoryContext)
    const [dropdown, setDropdown] = useState("all")
    const [freeClick, setFreeClick] = useState(false)
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

    // filt_act = activities

    function onAddActivity(newActivity) {
        setActivities([...activities, newActivity ])
    }

    if (dropdown !== 'all') {
        selectedCategory = categories.find((cat) => cat.type === dropdown);
      
        filt_act = activities.filter((ac) => {
          return ac.categories.filter(category => category.category_id === selectedCategory.id).length > 0;
        }).filter((ac) => {
            const startDate = new Date(ac.start_time);
            console.log(startDate)
            const currentDate = new Date()
            return startDate >= currentDate
        } );
      } else {
        filt_act = activities.filter((ac) => {
            const startDate = new Date(ac.start_time);
            console.log(startDate)
            const currentDate = new Date()
            return startDate >= currentDate
        })
      }

            
    
    //For each activity in activities, I need to iterate through activity.categories and see if 
    //category_id === selectedCategory.id
    
   
    console.log(dropdown)

    // const filteredActivities = activities.filter((ac) => {
    //     return ac.categories.filter(category => category.category_id === selectedCategory.id).length > 0;
    //   });
      
  //TO DO only LIST ACTIVITIES AFTER CURRENT DAY
    // const filteredActivities = dateValue.length > 0 
    //         ? activities
    //         .filter(act => act.start_time.slice(0, 10) === dateValue) 
    //         .filter(act => act.free === true)
    //         : activities;
   
    // const filteredActivities = activities.filter((act) => act.free === true)

    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }

    function handleCalendarClick() {
        navigate('/calendar')
    }

    const activityList = filt_act.map((activity) => (
            <ActivityList key={activity.id} activity={activity}  />
        ))

    if (!currentUser) {
        return null;
    }
 
    return(
        <div>
            <h1>Upcoming Activities</h1> 
            <button onClick={handleCalendarClick}>View Calendar</button>
            <ActivityMenu dropdown={dropdown} setDropdown={setDropdown} freeClick={freeClick} setFreeClick={setFreeClick}/>
            {/* <ActivityCalendar /> */}
            <button onClick={handleClick}>Add An Activity</button>
            {clicked ? 
            <ActivityForm onAddActivity={onAddActivity}/> : null}
            {activityList}      
        </div>
    )
}

export default Activities