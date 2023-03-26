import React, { useRef, useState } from "react"
import { Button, MediumText } from "../"
import { useNavigate } from "react-router-dom"

const TrackingKeyInput = ({ length, className }) => {
    const navigate = useNavigate()
    const [trackingKey, setTrackingKey] = useState(Array(length).fill(""))
    const [error, setError] = useState(null)
    const inputRefs = useRef(Array(length).fill(null))
    const handleChange = (e, index) => {
        const { value } = e.target
        const newTrackingKey = [...trackingKey]
        newTrackingKey[index] = value.charAt(value.length - 1)
        setTrackingKey(newTrackingKey)
        if (value.length > 0) {
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
    const onSubmit = async () => {
        if (trackingKey.filter((item) => item == "").length > 0) {
            return
        }
        const apiUrl = import.meta.env.VITE_API_URL
        try {
            const response = await fetch(`${apiUrl}/track/${trackingKey.join("")}`, {
                method: "GET",
            })
            const data = await response.json()
            const itemType = data.item.type
            const id = data.item.id
            const redirectUrl = `/matches/${itemType}/${id}`
            navigate(redirectUrl)
        } catch (error) {
            setError(error)
        }
    }

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
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="h-9 w-9 md:h-11 md:w-11 p-1 text-black border-black border-2 rounded-md text-center placeholder:opacity-30 focus:outline-1"
                        />
                    ))}
                </div>
                <Button onClick={onSubmit} className="w-3/4 md:w-1/4 lg:w-1/6 xl:w-1/8" extraClass="rounded-lg">
                    Prati
                </Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    )
}

export default TrackingKeyInput
