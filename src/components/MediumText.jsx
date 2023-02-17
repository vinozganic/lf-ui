import React from "react"

const MediumText = ({ children, className }) => {
    return <div className={`text-3xl font-bold ${className}`}>{children}</div>
}

export default MediumText