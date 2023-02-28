import React, { useState } from "react"
import { ChromePicker } from "react-color"
import Question from "./Question"

const ColourPicker = ({ questionId, updateAnswer }) => {
    const [colour, setColour] = useState("#000000")

    const handleChangeComplete = (colour) => {
        setColour(colour.rgb)
        updateAnswer(
            {
                r: colour.rgb.r,
                g: colour.rgb.g,
                b: colour.rgb.b,
            },
            questionId
        )
    }

    return (
        <div>
            <ChromePicker color={colour} onChange={handleChangeComplete} disableAlpha={true} className="m-10" />
        </div>
    )
}

const addColourPicker = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <ColourPicker questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addColourPicker
