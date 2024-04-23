import { createContext, useEffect, useState } from 'react'

const ActCategoryContext = createContext([])

function ActCategoryProvider({children}) {
    const [actCategories, setActCategories] = useState([])

    useEffect(() => {
        fetch('/activity-categories')
        .then(res => {
            if(res.status == 200) {
                res.json().then(data => setActCategories(data))
            }
        })
    }, [])
    

    return <ActCategoryContext.Provider value={{actCategories, setActCategories}}> {children}</ActCategoryContext.Provider>
}

export {ActCategoryContext, ActCategoryProvider}