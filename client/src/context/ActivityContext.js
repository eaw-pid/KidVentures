import { createContext, useEffect, useState } from 'react'

const ActivityContext = createContext([])

function ActivityProvider({children}) {
    const [activities, setActivities] = useState([])

    return <ActivityContext.Provider value={{activities, setActivities}}> {children}</ActivityContext.Provider>
}

export {ActivityContext, ActivityProvider}