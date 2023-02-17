import React from "react"

const SmallText = ({ children, className }) => {
    return <div className={`text-lg font-bold ${className}`}>{children}</div>
}

export default SmallText