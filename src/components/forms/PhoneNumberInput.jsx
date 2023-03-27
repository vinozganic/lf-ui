import React, { useState, useEffect } from "react"
import Question from "./Question"
import SmallText from "../SmallText"
import getPhoneNumber from "../../helpers/phoneNumberHelper"

const PhoneNumberInput = ({ questionId, updateAnswer }) => {
    const [countryData, setCountryData] = useState([])
    const [countrySearch, setCountrySearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [open, setOpen] = useState(false)
    const [phoneNumberInput, setPhoneNumberInput] = useState("")

    const handleCountrySearch = (e) => {
        const regex = /^[0-9\-]*$/
        if (e.target.value.match(regex)) {
            setCountrySearch(e.target.value)
        }
    }

    const handlePhoneNumberInput = (e) => {
        const regex = /^[0-9]*$/
        if (e.target.value.match(regex)) {
            setPhoneNumberInput(e.target.value)
        }
        const regexForUpdateAswear = /^[0-9]{4,}$/
        if (e.target.value.match(regexForUpdateAswear)) {
            updateAnswer(selectedCountry.replaceAll("-", "") + e.target.value, questionId)
        } else {
            updateAnswer(null, questionId)
        }
    }

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flag")
            const data = await response.json()
            data.sort((a, b) => a.name.common.localeCompare(b.name.common))
            setCountryData(data)
        }
        fetchCountries()
    }, [])
    return (
        <div className="flex items-center justify-between sm:justify-start">
            <div className="inline-flex">
                <div>
                    <div
                        className="bg-gray md:max-w-[8rem] mr-1 md:mr-0 p-2 flex rounded-xl border-2 border-gray cursor-pointer hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 items-center justify-between"
                        onClick={() => {
                            if (open) {
                                setOpen(false)
                                setPhoneNumberInput("")
                            } else {
                                setOpen(true)
                                updateAnswer(null, questionId)
                            }
                        }}>
                        <SmallText className={`inline-flex select-none ${selectedCountry ? "" : "mx-3"}`}>
                            {selectedCountry ? selectedCountry : "🇭🇷"}
                        </SmallText>
                        <span
                            className={`inline-flex ${
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
                    </div>
                    <div className={`bg-gray ${open ? "py-2" : "py-0"} mt-2 rounded-t-xl rounded-b-xl`}>
                        <ul className={`overflow-y-auto ${open ? "max-h-60" : "max-h-0"}`}>
                            <div className="flex items-center px-1 max-w-[12rem] bg-gray border-gray border-2 border-opacity-0 sticky top-0 mb-2 bg-opacity-50 hover:bg-opacity-100 hover:border-opacity-100">
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
                                    placeholder="Enter country code"
                                    className="p-2 pl-1 w-full bg-gray focus:outline-none bg-opacity-0 font-bold text-white placeholder:font-normal"
                                    value={countrySearch}
                                    onChange={(e) => handleCountrySearch(e)}
                                />
                            </div>
                            {countryData?.map((country) => {
                                const regex = new RegExp(countrySearch, "")
                                return (
                                    <>
                                        {country?.idd.root !== "" && (
                                            <li
                                                key={country.name.common}
                                                className={`p-2 border-2 select-none border-gray hover:bg-[#020829]/[.20] hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer items-center justify-between flex
                                            ${getPhoneNumber(country).match(regex) ? "block" : "hidden"} ${
                                                    getPhoneNumber(country) === selectedCountry
                                                        ? "bg-primary border-primary hover:bg-primary hover:bg-opacity-50 hover:border-primary hover:border-opacity-0"
                                                        : "bg-gray"
                                                }`}
                                                onClick={() => {
                                                    if (getPhoneNumber(country) !== selectedCountry) {
                                                        setSelectedCountry(getPhoneNumber(country))
                                                        setOpen(false)
                                                        setCountrySearch("")
                                                        setPhoneNumberInput("")
                                                    }
                                                }}>
                                                <span className="ml-2">
                                                    <SmallText className="inline-flex">{getPhoneNumber(country)}</SmallText>
                                                </span>
                                                <span className="mr-2">
                                                    <SmallText className="inline-flex">{country?.flag}</SmallText>
                                                </span>
                                            </li>
                                        )}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {!open && selectedCountry && (
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className="font-bold placeholder:font-normal placeholder:text-base focus:outline-none text-white text-lg p-2 border-2 border-gray rounded-xl md:-translate-x-12 hover:bg-opacity-80 duration-100 hover:border-primary hover:border-opacity-40 -translate-y-1 bg-gray w-[calc(16*1ch)] text-center"
                    maxLength="14"
                    value={phoneNumberInput}
                    onChange={(e) => handlePhoneNumberInput(e)}
                />
            )}
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
