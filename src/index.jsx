import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FoundPage from "./pages/FoundPage"
import LostPage from "./pages/LostPage"
import MatchFoundPage from "./pages/MatchFoundPage"
import MatchLostPage from "./pages/MatchLostPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import PrivacyPage from "./pages/PrivacyPage"

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
    {
        path: "/about",
        element: <AboutPage />,
    },
    {
        path: "/contact",
        element: <ContactPage />,
    },
    {
        path: "/privacy",
        element: <PrivacyPage />,
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />)
