import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
//TO DO
// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
import routes from "./routes.js";


const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
