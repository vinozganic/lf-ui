import React from "react"

const VeryBigText = ({ children, className }) => {
    return <p className={`text-7xl font-bold ${className}`}>{children}</p>
}

export default VeryBigText
