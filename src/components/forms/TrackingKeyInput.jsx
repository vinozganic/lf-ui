import React, { useRef, useState } from "react"
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
            const itemType = trackingKeyResult.data.type
            const id = trackingKeyResult.data.id
            const redirectUrl = `/matches/${itemType}/${id}`
            navigate(redirectUrl)
        } else {
            setError(trackingKeyResponse.data.message)
        }
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        const newTrackingKey = [...trackingKey]
        const oldValue = newTrackingKey[index]
        newTrackingKey[index] = value.replace(oldValue, "").toUpperCase()
        setTrackingKey(newTrackingKey)
        if (value.length > 0) {
            inputRefs.current[index].blur()
            inputRefs.current[index + 1]?.focus()
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0) {
            const newTrackingKey = [...trackingKey]
            newTrackingKey[index] = ""
            setTrackingKey(newTrackingKey)
            inputRefs.current[index - 1].focus()
        }

        if (e.key === "Delete" && index < length - 1) {
            const newTrackingKey = [...trackingKey]
            newTrackingKey[index] = ""
            setTrackingKey(newTrackingKey)
            inputRefs.current[index + 1].focus()
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus()
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    return (
        <div className={`flex flex-col items-center gap-1 w-full ${className}`}>
            <div className="flex flex-col items-center gap-4 w-full justify-center text-shadow-lg">
                <MediumText className="text-2xl">Prati svoj predmet:</MediumText>
                <div>
                    {trackingKey.map((value, index) => (
                        <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            key={index}
                            type="text"
                            placeholder={trackingKey.filter((item) => item != "").length > 0 ? "" : index + 1}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
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
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

export default TrackingKeyInput
