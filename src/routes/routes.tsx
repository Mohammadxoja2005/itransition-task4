import { createBrowserRouter } from "react-router-dom";
// pages
import MAIN from '../pages/main'; 
import LOGIN from "../pages/login";
import REGISTER from "../pages/register";

export const router = createBrowserRouter([
    {
        path: "/main",
        element: <MAIN />
    }, 
    {
        path: "/",
        element: <LOGIN />
    },
    {
        path: "/register",
        element: <REGISTER />
    }
])