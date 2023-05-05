import React, { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import "./DatePickerStyles.css"
import hrHR from "date-fns/locale/hr"
import { Question, SmallText } from "../../components"
import ReactDatePicker, { registerLocale } from "react-datepicker"

const DatePicker = ({ questionId, updateAnswer }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

    const handleSelectedDate = (date) => {
        setSelectedDate(date)
        setShowCalendar(false)
        updateAnswer(date, questionId)
    }

    const getNiceDate = (date) => {
        return date.getDate().toString() + " / " + (parseInt(date.getMonth()) + 1) + " / " + date.getFullYear().toString()
    }

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar)
        updateAnswer(selectedDate, questionId)
    }

    return (
        <div className="grid gap-y-2">
            <div
                onClick={handleShowCalendar}
                className={`grid-flow-row gap-4 items-center justify-start flex
                bg-gray px-4 py-2 w-[310px]
                border-gray border-2 hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 rounded-xl cursor-pointer ${
                    showCalendar && "bg-opacity-80 border-primary border-opacity-40 duration-100"
                }`}>
                <div>
                    <svg
                        className="w-5 h-5"
                        fill="white"
                        viewBox="0 0 20 20"
                        onClick={handleShowCalendar}
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path>
                    </svg>
                </div>
                <div onClick={handleShowCalendar} className="w-full text-center">
                    <SmallText className="select-none">{selectedDate ? getNiceDate(selectedDate) : "Odaberi datum"}</SmallText>
                </div>
            </div>

            {showCalendar && (
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={handleSelectedDate}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    showPopperArrow={false}
                    locale="hr-HR"
                    inline={true}
                    fixedHeight={true}
                />
            )}
        </div>
    )
}

const addDatePicker = (questionText, key, updateAnswer) => {
    registerLocale("hr-HR", hrHR)
    return (
        <Question questionText={questionText} key={key}>
            <DatePicker questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addDatePicker
