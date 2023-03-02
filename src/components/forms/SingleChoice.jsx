import React, { useState } from 'react'
import SmallText from '../SmallText'
import Question from './Question'

const SingleChoice = ({ values, questionId, updateAnswer }) => {
    const [radioComponentList, setRadioComponentList] = useState (
        values.map((item, i = 0) => {
            const id = i++
            return { id, value: item, checked: false }
        })
    )
    
    const handleSelectedState = (id) => {
        let selectedValue = null
        const newRadioComponentList = radioComponentList.map((item) => {
            if (id === item.id) { 
                selectedValue = item.value;
                return {...item, checked: true}
            }
            return {...item, checked: false}
        })
        setRadioComponentList(newRadioComponentList)
        updateAnswer (
            selectedValue,
            questionId
        )
    }

    const listRadioItems = radioComponentList.map((item) => (
        <li key={item.id} className={`p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4`}>
            <RadioComponent label={item.value} id={item.id} handleSelectedState={handleSelectedState} checked={item.checked} />
        </li>
    ))

    return <ul className="flex flex-wrap list-none">{listRadioItems}</ul>
}

const RadioComponent = ({ label, id, handleSelectedState, checked}) => {
    return (
        <div 
            className="bg-gradient-to-tr from-primary to-pink
                    border-black border rounded items-center flex pl-4 py-2 
                    cursor-pointer hover:opacity-60"
            onClick={() => handleSelectedState(id)}>
            { <div
                className={`w-8 h-8 rounded-full border-2 bg-opacity-70 border-black border-opacity-70 
                            flex items-center justify-center 
                            ${checked ? "bg-secondary" : ""}`}
                >
                {checked && (
                    <div className="w-4 h-4 rounded-full bg-black bg-opacity-70"></div>
                )}
              </div> }
            <SmallText className="inline-block mx-3">{label}</SmallText>
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