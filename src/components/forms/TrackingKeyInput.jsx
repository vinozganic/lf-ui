import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "use-http"
import { Button, MediumText, Spinner } from "../../components"
import { API_URL } from "../../constants"

const TrackingKeyInput = ({ length, className }) => {
    const [trackingKey, setTrackingKey] = useState(Array(length).fill(""))
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const inputRefs = useRef(Array(length).fill(null))

    const {
        loading,
        error: trackingKeyError,
        request: trackingKeyRequest,
        response: trackingKeyResponse,
    } = useFetch(`${API_URL}`, { cachePolicy: "no-cache" })

    const submitTrackingKey = async () => {
        const trackingKeyResult = await trackingKeyRequest.get(`/track/${trackingKey.join("")}`)
        if (trackingKeyResponse.ok) {
            setError(null)
            const itemType = trackingKeyResult.data.type
            const id = trackingKeyResult.data.id
            const redirectUrl = `/matches/${itemType}/${id}`
            navigate(redirectUrl)
        } else {
            setError(trackingKeyResponse.status === 404 ? "Pogrešan ključ za praćenje" : "Greška")
        }
    }

    const setOtherTrackingKeyElements = (index, value, newTrackingKey) => {
        newTrackingKey[index] = value.toUpperCase().charAt(0)
        if (value.length > 0) {
            inputRefs.current[index].blur()
            inputRefs.current[index + 1]?.focus()
        }
        if (value.length > 1 && index < length - 1) {
            setOtherTrackingKeyElements(index + 1, value.substring(1), newTrackingKey)
        }
    }

    const setFirstTrackingKeyElement = (index, value, newTrackingKey) => {
        const oldValue = newTrackingKey[index]
        if (oldValue === "") {
            newTrackingKey[index] = value.toUpperCase().charAt(0)
        } else {
            var regex = new RegExp(oldValue, "")
            newTrackingKey[index] = value.toUpperCase().replace(regex, "").charAt(0)
            value = value.toUpperCase().replace(regex, "")
        }
        if (value.length > 0) {
            inputRefs.current[index].blur()
            inputRefs.current[index + 1]?.focus()
        }
        if (value.length > 1 && index < length - 1) {
            setOtherTrackingKeyElements(index + 1, value.substring(1), newTrackingKey)
        }
        setTrackingKey(newTrackingKey)
    }

    const handleChange = (e, index) => {
        if (e.target.value.length > 0) {
            const { value } = e.target
            const newTrackingKey = [...trackingKey]
            const valueWihtoutSpecialChars = value.replace(/[^a-zA-Z\d]/g, "")
            if (valueWihtoutSpecialChars.length > 1 || (newTrackingKey[index].length === 0 && valueWihtoutSpecialChars.length > 0)) {
                setFirstTrackingKeyElement(index, valueWihtoutSpecialChars, newTrackingKey)
            }
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newTrackingKey = [...trackingKey]
            newTrackingKey[index] = ""
            setTrackingKey(newTrackingKey)
            if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
        if (e.key === "Delete") {
            const newTrackingKey = [...trackingKey]
            newTrackingKey[index] = ""
            setTrackingKey(newTrackingKey)
            if (index < length - 1) {
                inputRefs.current[index + 1].focus()
            }
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus()
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    useEffect(() => {
        for (let i = 0; i < length; i++) {
            if (inputRefs.current[i].current) {
                inputRefs.current[i].selectionStart = inputRefs.current[i].selectionEnd = inputRefs.current[i].value.length
            }
        }
    }, [])

    return (
        <div className={`flex flex-col items-center gap-1 w-full ${className}`}>
            <div className="flex flex-col items-center gap-4 w-full justify-center">
                <MediumText className="text-2xl">Prati svoj item:</MediumText>
                <div>
                    {trackingKey.map((value, index) => (
                        <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            key={index}
                            type="text"
                            placeholder={trackingKey.filter((item) => item != "").length > 0 ? "" : index + 1}
                            value={trackingKey[index]}
                            onChange={(e) => {
                                handleChange(e, index)
                            }}
                            onFocus={() => {
                                inputRefs.current[index].selectionStart = inputRefs.current[index].selectionEnd =
                                    inputRefs.current[index].value.length
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="h-9 w-9 md:h-11 md:w-11 p-1 m-[1px] bg-gray/95 text-white/90 font-semibold border-white/20 border-2 rounded-md text-center placeholder:opacity-50 caret-transparent cursor-pointer focus:border-white/50 focus:outline-none"
                        />
                    ))}
                </div>
                {trackingKey.filter((item) => item == "").length == 0 && (
                    <Button onClick={submitTrackingKey} className="w-3/4 md:w-1/4 lg:w-1/6 xl:w-1/8" buttonClassName="rounded-lg">
                        Prati
                    </Button>
                )}
            </div>
            {loading && <Spinner />}
            {error && <div className="mt-3 p-2 bg-red/50 rounded-lg">{error}</div>}
        </div>
    )
}

export default TrackingKeyInput
