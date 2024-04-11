import App from "./components/App"
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
        
            // {
            //     path: "/",
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
            // {
            //     path: "/my-connections",
            //     element: <MyConnects />,
            // },
            // {
            //     path: "/companies",
            //     element: <Companies />,
            // },
        
            
        ]
    }
]

export default routes;

