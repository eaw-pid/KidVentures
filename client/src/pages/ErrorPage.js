import React from 'react'
import { useRouteError, useNavigate } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate()
    console.error(error)

    function handleClick() {
        navigate('/activities')
    }

    return(
        <>
            <h1>Whoops! Something went wrong!</h1>
            <p>Try navigating to one of our other pages to get back on track.</p>
            <button onClick={handleClick}>Back to Activities Page</button>
        </>
    )
}

export default ErrorPage;