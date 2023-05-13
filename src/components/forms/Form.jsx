import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "use-http"
import { API_URL } from "../../constants"
import { Button, MediumText, Spinner, ProgressBar } from "../../components"

const Form = ({ questions, text, type, className }) => {
    const initialState = questions.map((question) => {
        return { fieldName: question.fieldName, answer: null }
    })

    const { loading, error: formError, request: formRequest, response: formResponse } = useFetch(`${API_URL}`)

    const [formAnswers, setFormAnswers] = useState(initialState)
    const [progress, setProgress] = useState(0)

    const navigate = useNavigate()

    const ref = useRef(null)

    const submitForm = useCallback(async () => {
        const payload = {}
        formAnswers.forEach((item) => {
            payload[item.fieldName] = item.answer
        })
        const formResult = await formRequest.post(`/${type}`, payload)
        if (formResponse.ok) {
            const id = formResult.data.id
            const redirectUrl = `/matches/${type}/${id}`
            navigate(redirectUrl)
        }
    }, [formRequest, formResponse, navigate, type])

    useEffect(() => {
        if (progress !== 0)
            scrollToBottom()
        else
            window.scrollTo({top: 0, behavior: "smooth"})
    }, [progress, formAnswers])

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }

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

    return (
        <div className={`${className} relative mx-6`}>
            <ProgressBar progress={progress} />
            <MediumText className="mt-28 text-2xl md:text-3xl w-full max-w-7xl">{text}</MediumText>
            <div className="w-full max-w-7xl">{renderQuestions()}</div>
            {progress === 100 && !loading && (
                <Button onClick={submitForm} className="w-3/4 lg:w-1/3 xl:w-1/4 mt-8">
                    Podnesi
                </Button>
            )}
            {loading && <Spinner />}
            <div ref={ref} className="mt-8"></div>
        </div>
    )
}

export default Form
