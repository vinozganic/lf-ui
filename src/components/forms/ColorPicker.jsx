import React, { useState } from "react"
import { ChromePicker } from "react-color"
import { Question, SmallText } from "../../components"
import "./ColorPickerStyles.css"

const ColorPicker = ({ questionId, updateAnswer }) => {
    const [color, setColor] = useState({ r: 21, g: 191, b: 230 })
    const handleChangeComplete = (color) => {
        setColor(color.rgb)
    }

    const handleSelectColor = () => {
        updateAnswer([color.r, color.g, color.b], questionId)
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:h-60">
            <ChromePicker
                color={color}
                onChange={handleChangeComplete}
                disableAlpha={true}
                className="pb-2 sm:ml-0 sm:mt-0 sm:mb-0 touch-none"
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
            <div className="flex flex-col items-center ml-0 mt-4 sm:ml-8 sm:mt-0 sm:mb-0">
                <div
                    className="sm:mb-0 w-28 h-28 px-4 py-2 border-2 border-gray rounded-full bg-primary"
                    style={{
                        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    }}></div>
                <div
                    className="w-full text-center bg-gray px-4 py-2 mt-4 sm:mt-4
                border-gray border-2 hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 rounded-xl duration-100 cursor-pointer"
                    onClick={handleSelectColor}>
                    <SmallText className="select-none">Odaberi boju</SmallText>
                </div>
            </div>
        </div>
    )
}

const addColorPicker = (questionText, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <ColorPicker questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addColorPicker
