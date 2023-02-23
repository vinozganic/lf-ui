import React from "react"
import TopBar from "./TopBar"

const Page = ({ children, className, bgImage }) => {
    const background = bgImage ? (
        <div
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
            className={`p-6 pt-24 bg-background ${className}`}>
            {children}
        </div>
    ) : (
        <div className={`p-6 pt-24 bg-background ${className}`}>{children}</div>
    )

    return (
        <>
            <TopBar />
            {background}
        </>
    )
}

export default Page
