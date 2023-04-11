import React, { useEffect, useState } from "react"
import SmallText from "../SmallText"
import Question from "./Question"

const SingleChoice = ({ values, questionId, updateAnswer }) => {
    const initialState = values.map((item, i = 0) => {
        const id = i++
        return { id, value: item, checked: false }
    })

    const [radioComponentList, setRadioComponentList] = useState(initialState)

    useEffect(() => {
        setRadioComponentList(initialState)
        updateAnswer(null, questionId)
    }, [values])

    const handleSelectedState = (id) => {
        let selectedValue = null
        const newRadioComponentList = radioComponentList.map((item) => {
            if (id === item.id) {
                selectedValue = item.value
                return { ...item, checked: true }
            }
            return { ...item, checked: false }
        })
        setRadioComponentList(newRadioComponentList)
        updateAnswer(selectedValue, questionId)
    }

    const listRadioItems = radioComponentList.map((item) => (
        <li key={item.id}>
            <RadioComponent label={item.value.toString()} id={item.id} handleSelectedState={handleSelectedState} checked={item.checked} />
        </li>
    ))

    return <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 list-none">{listRadioItems}</ul>
}

const RadioComponent = ({ label, id, handleSelectedState, checked }) => {
    return (
        <div
            className={`rounded-xl items-center flex pl-2 py-2 border-2 hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer ${
                checked ? "bg-primary border-primary" : "bg-gray border-gray"
            }`}
            onClick={() => handleSelectedState(id)}>
            {}
            <SmallText className="inline-block mx-3 select-none">{label}</SmallText>
        </div>
    )
}

const addSingleChoiceQuestion = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <SingleChoice values={options} questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addSingleChoiceQuestion
