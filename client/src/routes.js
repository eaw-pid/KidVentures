import App from "./components/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import BigCalendar from "./components/BigCalendar";
import ErrorPage from "./pages/ErrorPage";
import { UserContext } from "./context/UserContext";




const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
        
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/activities",
                element: <Activities />,
            },
            {
                path: "/activities/:id",
                element: <ActivityDetail />
            },
            {
                path: "/calendar",
                element: <BigCalendar />
            }
                
            
        ]
    }
]

export default routes;

