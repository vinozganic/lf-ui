import React from "react"
import { MediumText } from "../../components"

const Question = ({ questionText, children }) => {
    return (
        <div className="mt-14 md:mt-20 lg:mt-24 xl:mt-28">
            <MediumText className="mb-4">{questionText}</MediumText>
            {children}
        </div>
    )
}

export default Question
