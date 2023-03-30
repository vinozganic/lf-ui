import React from "react"
import MediumText from "../MediumText"

const Question = ({ questionText, children }) => {
    return (
        <div className="mt-16 md:mt-20 lg:mt-24 xl:mt-32">
            <MediumText className="mb-4">{questionText}</MediumText>
            {children}
        </div>
    )
}

export default Question
