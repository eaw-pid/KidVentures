import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { UserProvider } from "./context/UserContext.js";
import { ActivityProvider } from "./context/ActivityContext.js";
import { ReviewProvider } from "./context/ReviewContext.js";
import "./index.css";
//TO DO
// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
import routes from "./routes.js";


const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ActivityProvider>
            <ReviewProvider>
                <RouterProvider router={router} />
            </ReviewProvider>
        </ActivityProvider>
    </UserProvider>
);


// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
