import React, { useState } from "react"
import SmallText from "../SmallText"
import Question from "./Question"

const MultipleChoice = ({ values, questionId, updateAnswer }) => {
    const [checkboxItems, setCheckboxItems] = useState(
        values.map((item, i = 0) => {
            const id = i++
            return { id, value: item, checked: false }
        })
    )
    const handleSelectedState = (id) => {
        const newCheckboxItems = checkboxItems.map((item) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked }
            }
            return item
        })
        setCheckboxItems(newCheckboxItems)

        const answer = newCheckboxItems.filter((item) => item.checked).map((item) => item.value)
        updateAnswer(answer.length > 0 ? answer : null, questionId)
    }
    const listCheckboxItems = checkboxItems.map((item) => (
        <li key={item.id}>
            <CheckboxComponent label={item.value} id={item.id} handleSelectedState={handleSelectedState} checked={item.checked} />
        </li>
    ))
    return <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 list-none">{listCheckboxItems}</ul>
}
const CheckboxComponent = ({ label, id, handleSelectedState, checked }) => {
    return (
        <div
            className={`rounded-xl items-center flex pl-3 py-2 border-2 hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer ${
                checked ? "bg-primary border-primary" : "bg-gray border-gray"
            }`}
            onClick={() => handleSelectedState(id)}>
            <div className={`w-6 h-6 rounded-lg bg-white flex items-center justify-center ${checked ? "bg-secondary" : ""}`}>
                {checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-primary">
                        <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                    </svg>
                )}
            </div>
            <SmallText className="inline-block mx-3 select-none">{label}</SmallText>
        </div>
    )
}

const addMultipleChoiceQuestion = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <MultipleChoice values={options} questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addMultipleChoiceQuestion
