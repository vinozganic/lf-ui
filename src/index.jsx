import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FoundPage from "./pages/FoundPage"
import LostPage from "./pages/LostPage"
import MatchFoundPage from "./pages/MatchFoundPage"
import MatchLostPage from "./pages/MatchLostPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/found",
        element: <FoundPage />,
    },
    {
        path: "/lost",
        element: <LostPage />,
    },
    {
        path: "/matches/found/:id",
        element: <MatchFoundPage />,
    },
    {
        path: "/matches/lost/:id",
        element: <MatchLostPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
