import React, { useState, useEffect } from "react"
import countryData from "../../helpers/phoneNumberHelper"
import { SmallText, Question } from "../../components"

const PhoneNumberInput = ({ questionId, updateAnswer }) => {
    const [countrySearch, setCountrySearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState({
        name: "United States",
        prefix: "+1",
        flag: "🇺🇸",
    })
    const [open, setOpen] = useState(false)
    const [phoneNumberInput, setPhoneNumberInput] = useState("")

    const handleCountrySearch = (e) => {
        setCountrySearch(e.target.value)
    }

    const handlePhoneNumberInput = (e) => {
        const inputtedValue = e.target.value.replace(/\D/g, "")
        setPhoneNumberInput(inputtedValue)
        if (inputtedValue.length > 3) {
            const phoneNumber = selectedCountry.prefix + inputtedValue
            updateAnswer(phoneNumber, questionId)
        }
    }

    return (
        <div>
            <div className="flex gap-1">
                <div className="w-[40%] sm:w-[14%] sm:min-w-max">
                    <div
                        className="bg-gray p-2 pr-1 flex rounded-xl border-2 border-gray cursor-pointer hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 items-center justify-between"
                        onClick={() => {
                            if (open) {
                                setOpen(false)
                                setCountrySearch("")
                            } else {
                                setOpen(true)
                                if (phoneNumberInput.length > 3) {
                                    const phoneNumber = selectedCountry.prefix + phoneNumberInput
                                    updateAnswer(phoneNumber, questionId)
                                } else {
                                    updateAnswer(null, questionId)
                                }
                            }
                        }}>
                        <div className="inline-flex">
                            <span
                                className={`${
                                    open ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"
                                }`}>
                                <svg
                                    className="fill-white"
                                    data-name="Layer 1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    width="26">
                                    <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
                                </svg>
                            </span>
                            <SmallText className="select-none px-1 pl-2 font-noto">{selectedCountry.flag}</SmallText>
                        </div>
                        <SmallText className="select-none">{selectedCountry.prefix}</SmallText>
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="font-bold h-12 placeholder:font-normal placeholder:text-center placeholder:text-base focus:outline-none text-white text-lg p-2 pl-1 border-2 border-gray rounded-xl hover:bg-opacity-80 duration-100 hover:border-primary hover:border-opacity-40 bg-gray w-[calc(16*1ch)]"
                        value={phoneNumberInput}
                        maxLength="14"
                        onChange={(e) => handlePhoneNumberInput(e)}
                    />
                </div>
            </div>
            <div className={`bg-gray ${open ? "py-2" : "py-0"} mt-2 rounded-t-xl rounded-b-xl w-[40%] sm:w-[14%]`}>
                <ul className={`overflow-y-auto ${open ? "max-h-60" : "max-h-0"} scrollbar-hide`}>
                    <div className="flex items-center px-1 bg-gray border-gray border-2 sticky top-0 p-2">
                        <span className="mx-1">
                            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20">
                                <path
                                    d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
                                    data-name="49-Search"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-[70%] bg-gray focus:outline-none font-bold text-white placeholder:font-normal"
                            value={countrySearch}
                            onChange={(e) => handleCountrySearch(e)}
                        />
                    </div>
                    {countryData.map((country) => {
                        return (
                            <li
                                key={country.name}
                                className={`p-2 border-2 select-none border-gray hover:bg-[#020829]/[.20] hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer items-center justify-between flex
                                            ${
                                                country.prefix.includes(countrySearch) ||
                                                country.name.toLowerCase().includes(countrySearch.toLowerCase())
                                                    ? "block"
                                                    : "hidden"
                                            } ${
                                    country === selectedCountry
                                        ? "bg-primary border-primary hover:bg-primary/50 hover:border-primary hover:border-opacity-0"
                                        : "bg-gray"
                                }`}
                                onClick={() => {
                                    if (country !== selectedCountry) {
                                        setSelectedCountry(country)
                                        setOpen(false)
                                        setCountrySearch("")
                                        if (phoneNumberInput.length > 3) {
                                            const phoneNumber = country.prefix + phoneNumberInput
                                            updateAnswer(phoneNumber, questionId)
                                        }
                                    }
                                }}>
                                <span>
                                    <SmallText>{country.prefix}</SmallText>
                                </span>
                                <span>
                                    <SmallText className="font-noto">{country.flag}</SmallText>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const addPhoneNumberInputQuestion = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <PhoneNumberInput questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addPhoneNumberInputQuestion
