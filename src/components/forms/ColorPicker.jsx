import React, { useState } from "react"
import { ChromePicker } from "react-color"
import Question from "./Question"
import "./ColorPickerStyles.css"

const ColorPicker = ({ questionId, updateAnswer }) => {
    const [color, setColor] = useState("#000000")

    const handleChangeComplete = (color) => {
        setColor(color.rgb)
        updateAnswer([color.rgb.r, color.rgb.g, color.rgb.b], questionId)
    }

    return (
        <ChromePicker
            color={color}
            onChange={handleChangeComplete}
            disableAlpha={true}
            className="pb-2"
            styles={{
                default: {
                    picker: {
                        boxShadow: "none",
                        border: "none",
                        backgroundColor: "#384866",
                        borderRadius: "0.5rem",
                    },
                    saturation: {
                        borderTopLeftRadius: "0.5rem",
                        borderTopRightRadius: "0.5rem",
                    },
                },
            }}
        />
    )
}

const addColorPicker = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <ColorPicker questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addColorPicker
