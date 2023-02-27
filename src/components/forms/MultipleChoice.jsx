import React, { useState } from "react"
import SmallText from "../SmallText"

const MultipleChoice = ({ values, className }) => {
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
    }
    const listCheckboxItems = checkboxItems.map((item) => (
        <li key={item.id} className={`p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4`}>
            <CheckboxComponent label={item.value} id={item.id} handleSelectedState={handleSelectedState} checked={item.checked} />
        </li>
    ))
    return (
        <div className={`${className}`}>
            <ul className="flex flex-wrap list-none">{listCheckboxItems}</ul>
        </div>
    )
}
const CheckboxComponent = ({ label, id, handleSelectedState, checked }) => {
    return (
        <div
            className="bg-gradient-to-tr from-primary to-pink border-black border rounded items-center flex pl-4 py-2 cursor-pointer hover:from-primary hover:to-pink hover:opacity-60"
            onClick={() => handleSelectedState(id)}>
            <div
                className={`w-8 h-8 rounded-full border-2 bg-opacity-70 border-black border-opacity-70 flex items-center justify-center ${
                    checked ? "bg-secondary" : ""
                }`}>
                {checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                    </svg>
                )}
            </div>
            <SmallText className="inline-block mx-3">{label}</SmallText>
        </div>
    )
}

export default MultipleChoice