import React from "react"

const BigText = ({ children, className }) => {
    return <div className={`text-5xl font-bold  ${className}`}>{children}</div>
}

export default BigText