import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FoundPage from "./pages/FoundPage"
import MatchFoundPage from "./pages/MatchFoundPage"
import MatchLostPage from "./pages/MatchLostPage"
import MatchesPage from "./pages/MatchesPage"

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
        path: "/matches/found/:id",
        element: <MatchFoundPage />,
    },
    {
        path: "/matches/lost/:id",
        element: <MatchLostPage />,
    },
    {
        path: "/dm/:id",
        element: <HomePage />,
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
