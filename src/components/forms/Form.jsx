import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProgressBar from "./ProgressBar"
import Button from "../Button"

const Form = ({ questions, className }) => {
    const location = useLocation()

    const navigate = useNavigate()

    const setInitialState = () => {
        const initialState = questions.map((question) => {
            return { fieldName: question.fieldName, answer: null }
        })

        return initialState
    }

    const [formAnswers, setFormAnswers] = useState(setInitialState()) // 1.
    const [progress, setProgress] = useState(0)

    const [error, setError] = useState(null)

    const ref = useRef(null)

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [progress])

    const addQuestion = (questionObject, updateAnswer) => {
        const questionElement = questionObject.create(questionObject.text, questionObject.options, questionObject.fieldName, updateAnswer)
        return questionElement
    }

    const updateAnswer = (answer, key) => {
        let newFormAnswers = [...formAnswers]
        newFormAnswers.forEach((item) => {
            if (item.fieldName === key) {
                item.answer = answer
            }
        })
        if (answer === null) {
            let currentIdx = newFormAnswers.findIndex((item) => item.fieldName === key)
            newFormAnswers.forEach((oldAnswer, i) => {
                if (i > currentIdx) {
                    oldAnswer.answer = null
                }
            })
        }
        setFormAnswers(newFormAnswers)

        const progress = Math.round((newFormAnswers.filter((item) => item.answer !== null).length / questions.length) * 100)
        setProgress(progress)
    }

    const renderQuestions = () => {
        let exit = false
        const questionElements = questions.map((question, i) => {
            if (exit) {
                return null
            }
            if (i === 0) {
                return addQuestion(question, updateAnswer)
            } else {
                if (Array.isArray(formAnswers[i - 1].answer)) {
                    if (formAnswers[i - 1].answer.length > 0) {
                        return addQuestion(question, updateAnswer)
                    }
                } else if (formAnswers[i - 1].answer) {
                    return addQuestion(question, updateAnswer)
                } else {
                    exit = true
                    return null
                }
            }
        })
        return questionElements
    }

    const generatePayload = () => {
        const payload = {}
        formAnswers.forEach((item) => {
            payload[item.fieldName] = item.answer
        })
        return payload
    }

    const handleSubmit = async () => {
        const payload = generatePayload()

        let endpoint
        const apiUrl = import.meta.env.VITE_API_URL
        if (location.pathname.includes("/lost")) {
            endpoint = "lost"
        } else if (location.pathname.includes("/found")) {
            endpoint = "found"
        }

        try {
            const response = await fetch(`${apiUrl}/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            const data = await response.json()
            if (data.success) {
                const itemType = endpoint
                const id = data[itemType]._id
                const redirectUrl = `/matches/${itemType}/${id}`
                navigate(redirectUrl)
            } else {
                setError(data.error.message)
            }
        } catch (error) {
            setError("error")
        }
    }

    return (
        <div className={`${className} relative flex items-center`}>
            <ProgressBar progress={progress} />
            <div className="mt-32 w-full max-w-7xl">{renderQuestions()}</div>
            {progress === 100 && (
                <Button onClick={handleSubmit} className="w-3/4 lg:w-1/3 xl:w-1/4 mt-8">
                    Submit
                </Button>
            )}
            {error && <p className="text-white">{error}</p>}
            <div ref={ref}></div>
        </div>
    )
}

export default Form
