import { createContext, useEffect, useState } from 'react'

const CategoryContext = createContext([])

function CategoryProvider({children}) {
    const [categories, setCategories] = useState([])

    return <CategoryContext.Provider value={{categories, setCategories}}> {children}</CategoryContext.Provider>
}

export {CategoryContext, CategoryProvider}