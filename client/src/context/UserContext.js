import { createContext, useEffect, useState} from 'react';


const UserContext = createContext({})

function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
   
    useEffect(() => {
        fetch('/check-session')
        .then(res => {
            if(res.status == 200) {
                res.json().then(data => login(data))
            }
        })
    }, [])

    function login(user) {
        setCurrentUser(user)
        setLoggedIn(true)
    }

    function logout() {
        fetch("/logout" , {
            method: "DELETE"
        })
        .then(res => {
            if(res.status == 200) {
                setCurrentUser(null)
                setLoggedIn(false)
            } 
        })
    }

    return <UserContext.Provider value={{currentUser, loggedIn, login, logout}} > {children }</UserContext.Provider>
    

}

export {UserContext, UserProvider }