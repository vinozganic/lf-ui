import React, { useState, useEffect } from "react"
import Question from "./Question"
import SmallText from "../SmallText"
import getPhoneNumber from "../../helpers/phoneNumberHelper"

const PhoneNumberInput = ({ questionId, updateAnswer }) => {
    const [countryData, setCountryData] = useState([])
    const [countrySearch, setCountrySearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState({
        phoneNumber: "+1",
        flag: "🇺🇸",
    })
    const [open, setOpen] = useState(false)
    const [phoneNumberInput, setPhoneNumberInput] = useState("")

    const handleCountrySearch = (e) => {
        const regex = /^[0-9\-]*$/
        if (e.target.value.match(regex)) {
            setCountrySearch(e.target.value)
        }
    }

    const handlePhoneNumberInput = (e) => {
        const inputedValue = e.target.value.replace(/\D/g, "")
        setPhoneNumberInput(inputedValue)
        if (inputedValue.length > 3) {
            const phoneNumber = selectedCountry.phoneNumber + inputedValue
            updateAnswer(phoneNumber, questionId)
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
        <div className="flex justify-start flex-col sm:flex-row sm:items-center sm:justify-start">
            <div className="inline-flex mr-0 mb-2 sm:mr-3 sm:mb-0">
                <div className="h-12">
                    <div
                        className="bg-gray w-full p-2 flex rounded-xl border-2 border-gray cursor-pointer hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 items-center justify-between"
                        onClick={() => {
                            if (open) {
                                setOpen(false)
                                setPhoneNumberInput("")
                            } else {
                                setOpen(true)
                                updateAnswer(null, questionId)
                            }
                        }}>
                        <div className="inline-flex">
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
                            <SmallText className={`inline-flex select-none px-1 pl-2 font-noto`}>{selectedCountry.flag}</SmallText>
                        </div>
                        <SmallText className={`inline-flex select-none`}>{selectedCountry.phoneNumber}</SmallText>
                    </div>
                    <div className={`bg-gray ${open ? "py-2" : "py-0"} mt-2 rounded-t-xl rounded-b-xl`}>
                        <ul className={`overflow-y-auto ${open ? "max-h-60" : "max-h-0"} scrollbar-hide`}>
                            <div className="flex items-center px-1 w-[12rem] bg-gray border-gray border-2 sticky top-0 mb-2">
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
                                    country?.idd.root !== "" && (
                                        <li
                                            key={country.name.common}
                                            className={`p-2 border-2 select-none border-gray hover:bg-[#020829]/[.20] hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer items-center justify-between flex
                                            ${getPhoneNumber(country).match(regex) ? "block" : "hidden"} ${
                                                getPhoneNumber(country) === selectedCountry.phoneNumber &&
                                                country.flag === selectedCountry.flag
                                                    ? "bg-primary border-primary hover:bg-primary hover:bg-opacity-50 hover:border-primary hover:border-opacity-0"
                                                    : "bg-gray"
                                            }`}
                                            onClick={() => {
                                                if (
                                                    getPhoneNumber(country) !== selectedCountry.phoneNumber ||
                                                    country.flag !== selectedCountry.flag
                                                ) {
                                                    setSelectedCountry({
                                                        phoneNumber: getPhoneNumber(country),
                                                        flag: country.flag,
                                                    })
                                                    setOpen(false)
                                                    setCountrySearch("")
                                                    setPhoneNumberInput("")
                                                }
                                            }}>
                                            <span className="ml-2">
                                                <SmallText className="inline-flex">{getPhoneNumber(country)}</SmallText>
                                            </span>
                                            <span className="mr-2">
                                                <SmallText className="inline-flex font-noto">{country?.flag}</SmallText>
                                            </span>
                                        </li>
                                    )
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="inline-flex">
                {!open && (
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="font-bold placeholder:font-normal placeholder:text-center placeholder:text-base focus:outline-none text-white text-lg p-2 border-2 border-gray rounded-xl hover:bg-opacity-80 duration-100 hover:border-primary hover:border-opacity-40 bg-gray w-[12rem] text-left"
                        maxLength="14"
                        value={phoneNumberInput}
                        onChange={(e) => handlePhoneNumberInput(e)}
                    />
                )}
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
