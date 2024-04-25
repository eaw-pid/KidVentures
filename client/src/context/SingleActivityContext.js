import { createContext, useEffect, useState } from 'react'

const SingleActivityContext = createContext([])

function SingleActivityProvider({children}) {
    const [singleActivity, setSingleActivity] = useState([])



    return <SingleActivityContext.Provider value={{singleActivity, setSingleActivity}}> {children}</SingleActivityContext.Provider>
}

export {SingleActivityContext, SingleActivityProvider}