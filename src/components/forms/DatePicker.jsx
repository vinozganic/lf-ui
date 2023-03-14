import React, { useState, useEffect } from "react"
import Question from "./Question"

import ReactDatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "./DatePickerStyles.css" // imported costum styles for DatePicker component
import hrHR from "date-fns/locale/hr"

const DatePicker = ({ questionId, updateAnswer}) => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    const minTextInputYear = 2000;

    const handleSelectedDate = (date) => {
        setSelectedDate(date)
        setDateText(date.getDate().toString() + " / " + (parseInt(date.getMonth()) + 1) + " / " + date.getFullYear().toString())
        updateAnswer(selectedDate, questionId)
    }

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    const handleOnChange = (event) => {
        let inputValueChanged = (event.target.value).replace(/\s+/g, "");

        if (inputValueChanged.includes(".")) {
            inputValueChanged = inputValueChanged.replaceAll(".", "/");
        } 
        else if (inputValueChanged.includes(":")) {
            inputValueChanged = inputValueChanged.replaceAll(":", "/");
        }
        else if (inputValueChanged.includes("-")) {
            inputValueChanged = inputValueChanged.replaceAll("-", "/");
        }
        var splited = (inputValueChanged).split("/");
        const parsedDate = new Date(parseInt(splited[2], 10), parseInt(splited[1], 10) - 1, parseInt(splited[0], 10));
        
        if (!isNaN(parsedDate) && parsedDate < new Date()) {
            const checkString = (splited[0].padStart(2, "0")).trim() + "/" + (splited[1].padStart(2, "0")).trim() + "/" + (splited[2]).trim();
            const day = parsedDate.getDate().toString().padStart(2, "0");
            const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
            const year = parsedDate.getFullYear().toString();
            if (checkString === `${day}/${month}/${year}` && parseInt(year) > minTextInputYear ) {
                setSelectedDate(parsedDate);
                setDateText(`${parsedDate.getDate().toString()} / ${(parsedDate.getMonth() + 1).toString()} / ${year}`);
                updateAnswer(parsedDate, questionId);
                return;
            }
        }
        setSelectedDate(null);
        setDateText(event.target.value);
    }
    
    return (
        <div className="grid gap-y-4">
            <div className="grid-flow-row gap-2 items-center justify-start flex 
                bg-background p-4 py-2 w-[300px]
                border-primary border-2 rounded-xl">
                <div>
                    <svg className="w-5 h-5 cursor-pointer" fill="white" 
                    viewBox="0 0 20 20" onClick={handleShowCalendar}
                    xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" 
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z">
                        </path>
                    </svg>
                </div>
                <div className="mx-2">
                    <input type="text" onChange={handleOnChange} value={dateText} maxLength={15} placeholder="Upisi datum"
                        className={`focus:outline-none ${selectedDate === null ? "text-white" : "text-primary"} text-lg font-bold border-none bg-transparent`} />
                </div>
            </div>
            {showCalendar && <ReactDatePicker
                selected={selectedDate}
                onChange={handleSelectedDate}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                inline={true}
                locale="hr-HR"/>
            }
        </div>
    )
}

const addDatePicker = (questionText, options, key, updateAnswer) => {
    registerLocale("hr-HR", hrHR)
    return (
        <Question questionText={questionText} key={key}> 
            <DatePicker questionId={key} updateAnswer={updateAnswer}/>
        </Question>
    )
}

export default addDatePicker