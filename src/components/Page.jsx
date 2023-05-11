import React, { useEffect } from "react"
import { TopBar, Footer } from "../components"

const Page = ({ children, className, bgClassName }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={`min-h-screen pt-24 bg-background ${bgClassName} flex flex-col justify-between `}>
            <TopBar />
            <div className={`flex-grow ${className}`}>{children}</div>
            <Footer />
        </div>
    )
}

export default Page
