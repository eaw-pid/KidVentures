import { createContext, useEffect, useState } from 'react'

const ReviewContext = createContext([])

function ReviewProvider({children}) {
    const [reviews, setReviews] = useState([])

    return <ReviewContext.Provider value={{reviews, setReviews}}> {children}</ReviewContext.Provider>
}

export {ReviewContext, ReviewProvider}