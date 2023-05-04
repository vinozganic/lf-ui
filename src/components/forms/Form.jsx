import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "use-http"
import { API_URL } from "../../constants"
import { Button, BigText, Spinner, ProgressBar } from "../../components"

const Form = ({ questions, text, type, className }) => {
    const initialState = questions.map((question) => {
        return { fieldName: question.fieldName, answer: null }
    })

    const { post, loading, error: fetchError } = useFetch(`${API_URL}/${type}`, { headers: { "Content-Type": "application/json" } })

    const [formAnswers, setFormAnswers] = useState(initialState)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const ref = useRef(null)

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [progress, formAnswers])

    const addQuestion = (questionObject, updateAnswer) => {
        const questionElement = questionObject.create(questionObject.text, questionObject.fieldName, updateAnswer)
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

        try {
            const data = await post(payload)
            console.log(data)
            if (fetchError && !data) {
                setError(fetchError.message)
                return
            }

            if (data.success === false) {
                setError(data.error.message)
                return
            }

            const id = data[type]._id
            const redirectUrl = `/matches/${type}/${id}`
            navigate(redirectUrl)
        } catch (error) {
            setError("error")
        }
    }

    return (
        <div className={`${className} relative mx-6`}>
            <ProgressBar progress={progress} />
            <BigText className="mt-32 w-full max-w-7xl">{text}</BigText>
            <div className="w-full max-w-7xl">{renderQuestions()}</div>
            {progress === 100 && !loading && (
                <Button onClick={handleSubmit} className="w-3/4 lg:w-1/3 xl:w-1/4 mt-8">
                    Submit
                </Button>
            )}
            {loading && <Spinner />}
            {error && <p className="text-white">{error}</p>}
            <div ref={ref} className="mt-8"></div>
        </div>
    )
}

export default Form
