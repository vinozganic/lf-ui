import React, { useState } from "react"
import { ChromePicker } from "react-color"
import Question from "./Question"
import "./ColorPickerStyles.css"
import { SmallText } from "../"

const ColorPicker = ({ questionId, updateAnswer }) => {
    const [color, setColor] = useState("#15bfe6")

    const handleChangeComplete = (color) => {
        setColor(color.rgb)
    }

    const handleSelectColor = () => {
        updateAnswer([color.r, color.g, color.b], questionId)
    }

    return (
        <div className="flex">
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
            <div className="ml-5">
                <div
                    className="w-[150px] h-[123.75px] px-4 py-2 border-2 border-gray bg-primary"
                    style={{
                        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                        marginBottom: "1rem",
                        borderRadius: "0.5rem",
                    }}
                ></div>
                <div className="w-full text-center bg-gray px-4 py-2 
                border-gray border-2 hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 rounded-xl duration-100 cursor-pointer" onClick={handleSelectColor}>
                    <SmallText className="select-none">Odaberi boju</SmallText>
                </div>
            </div>
        </div>
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
