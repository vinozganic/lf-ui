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

    const { get, loading, error: fetchError } = useFetch(`${API_URL}/track/${trackingKey.join("")}`, { cachePolicy: "no-cache" })

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
    const onSubmit = async () => {
        try {
            const data = await get()
            if (fetchError && !data) {
                setError(fetchError.message)
                return
            }

            if (data.success === false) {
                setError(data.error.message)
                return
            }

            const itemType = data.item.type
            const id = data.item.id
            const redirectUrl = `/matches/${itemType}/${id}`
            navigate(redirectUrl)
        } catch (error) {
            setError("error")
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
                            className="h-9 w-9 md:h-11 md:w-11 p-1 m-[1px] bg-gray/95 text-white/90 font-semibold border-white/20 border-2 rounded-md text-center placeholder:opacity-50 caret-transparent cursor-pointer focus:border-white/50 focus:outline-none"
                        />
                    ))}
                </div>
                {trackingKey.filter((item) => item == "").length == 0 && (
                    <Button onClick={onSubmit} className="w-3/4 md:w-1/4 lg:w-1/6 xl:w-1/8" buttonClassName="rounded-lg">
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
