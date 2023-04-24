import React from "react"
import { TopBar, Footer } from "./"

const Page = ({ children, className, bgClassName }) => {
    return (
        <div className={`min-h-screen pt-24 bg-background ${bgClassName} flex flex-col justify-between `}>
            <TopBar />
            <div className={`flex-grow ${className}`}>{children}</div>
            <Footer />
        </div>
    )
}

export default Page
