import React from "react"
import MediumText from "../MediumText"

const Question = ({ questionText, children }) => {
    return (
        <>
            <MediumText>{questionText}</MediumText>
            {children}
        </>
    )
}

export default Question
