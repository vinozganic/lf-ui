import React from "react"
import MediumText from "../MediumText"

const Question = ({ questionText, children }) => {
    return (
        <div>
            <MediumText className="mb-4">{questionText}</MediumText>
            {children}
        </div>
    )
}

export default Question
