import React from "react"

const Page = ({ children, className }) => {
    return <div className={`p-6 h-screen bg-background ${className}`}>{children}</div>
}

export default Page
