import React from "react"

const VeryBigText = ({ children, className }) => {
    return <div className={`text-7xl font-bold ${className}`}>{children}</div>
}

export default VeryBigText