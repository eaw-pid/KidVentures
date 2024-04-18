import App from "./components/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
        
            // {
            //     path: "/home",
            //     element: <Home />
            // },
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
            }
                
            
     
            
        ]
    }
]

export default routes;

