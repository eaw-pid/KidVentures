import { createContext, useEffect, useState } from 'react'

const DateValueContext = createContext([])

function DateValueProvider({children}) {
    const [dateValue, setDateValue] = useState([])

    return <DateValueContext.Provider value={{dateValue, setDateValue}}> {children}</DateValueContext.Provider>
}

export {DateValueContext, DateValueProvider}