import React, { useState, useCallback, useEffect } from "react"
import { SmallText, MediumText, Spinner, Question, SvgList } from "../../components"
import { API_URL } from "../../constants"
import { useFetch } from "use-http"

const TypePicker = ({ questionId, updateAnswer }) => {
    const [types, setTypes] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedType, setSelectedType] = useState(null)
    const [typeSearch, setTypeSearch] = useState("")

    const { loading: typesLoading, error: typesError, request: typesRequest, response: typesResponse } = useFetch(`${API_URL}`)

    const getTypes = useCallback(async () => {
        const types = await typesRequest.get(`/config/types`)
        if (typesResponse.ok) {
            setTypes(types.data)
        }
    }, [typesRequest, typesResponse])

    const handleClickOpen = () => {
        setOpen(!open)
        setTypeSearch("")
    }

    const handleSetType = (type) => {
        if (type !== selectedType) {
            setSelectedType(type)
            setOpen(false)
            setTypeSearch("")
            updateAnswer(type.name, questionId)
        }
    }

    const handleTypeSearch = (e) => {
        setTypeSearch(e.target.value)
    }

    useEffect(() => {
        getTypes()
    }, [])

    const toLowerCaseWithoutSpecialCharacters = (string) => {
        return string.toLowerCase().replace(/č/g, "c").replace(/ć/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z")
    }

    return (
        <>
            {(typesLoading || !typesResponse.ok) && <Spinner />}
            {!typesLoading && typesResponse.ok && (
                <div
                    className="w-full bg-gray py-4 px-8 inline-flex justify-between items-center mb-2 rounded-xl border-2 border-gray cursor-pointer hover:border-primary hover:border-2 hover:bg-opacity-60"
                    onClick={handleClickOpen}>
                    <span className="select-none">
                        <MediumText className="font-normal">{selectedType === null ? "Unesite vrstu" : selectedType.niceName}</MediumText>
                    </span>
                    <span className={`${open ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"}`}>
                        <svg className="fill-white" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30">
                            <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
                        </svg>
                    </span>
                </div>
            )}
            {open && !typesLoading && typesResponse.ok && (
                <div className="py-2 rounded-xl bg-gray">
                    <div className="sticky flex items-center top-0 w-full p-4 pb-6 bg-gray px-8 border-b-2 border-white">
                        <span className="mr-6">
                            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26">
                                <path
                                    d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z"
                                    data-name="49-Search"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray focus:outline-none text-white placeholder:font-normal placeholder:text-lg text-lg"
                            value={typeSearch}
                            onChange={handleTypeSearch}
                        />
                    </div>
                    <ul className="w-full p-2 max-h-80 overflow-y-auto flex-row flex gap-y-2 flex-wrap scrollbar-hide">
                        {types.map((type) => (
                            <li
                                key={type.name}
                                className={`${
                                    type.name.toLowerCase().includes(typeSearch.toLowerCase()) ||
                                    toLowerCaseWithoutSpecialCharacters(type.niceName).includes(
                                        toLowerCaseWithoutSpecialCharacters(typeSearch)
                                    ) ||
                                    type.name === "other"
                                        ? "block"
                                        : "hidden"
                                } xl:w-1/3 sm:w-1/2 w-full flex-[0 1 33.33%]`}
                                onClick={() => handleSetType(type)}>
                                <div
                                    className={`px-2 py-1 border-2 m-2 h-full box-border rounded-xl hover:border-2 flex justify-between items-center ${
                                        selectedType === type
                                            ? "border-primary bg-primary hover:bg-primary/50 hover:border-opacity-0"
                                            : "border-white cursor-pointer bg-gray hover:bg-[#020829]/[.20] hover:border-primary transition ease-in-out delay-50 hover:scale-[1.02] duration-100"
                                    }`}>
                                    <span className="px-2 select-none">
                                        <SmallText>{type.niceName}</SmallText>
                                    </span>
                                    <span className={`p-2 rounded-full border bg-gray ${selectedType === type ? "border-gray" : ""}`}>
                                        {SvgList[type.name] && SvgList[type.name]}
                                        {!SvgList[type.name] && SvgList["default"]}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

const addTypePicker = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <TypePicker questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}

export default addTypePicker
