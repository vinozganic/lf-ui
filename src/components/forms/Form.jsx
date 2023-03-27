import React, { useEffect, useRef, useState } from "react"
import useLocation from "react-router-dom"
import ProgressBar from "./ProgressBar"
import Button from "../Button"

const Form = ({ questions, className }) => {
    const UrlLocation = useLocation()

    const [formAnswers, setFormAnswers] = useState(questions.map((item) => null))
    const [progress, setProgress] = useState(0)

    const ref = useRef(null)

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [progress])

    const addQuestion = (questionObject, key, updateAnswer) => {
        const questionElement = questionObject.create(questionObject.text, questionObject.options, key, updateAnswer)
        return questionElement
    }

    const updateAnswer = (answer, key) => {
        let newFormAnswers = formAnswers.map((oldAnswer, i) => (i === key ? answer : oldAnswer))
        if (answer === null) {
            newFormAnswers = newFormAnswers.map((oldAnswer, i) => (i > key ? null : oldAnswer))
        }
        setFormAnswers(newFormAnswers)

        const progress = Math.round((newFormAnswers.filter((item) => item !== null).length / questions.length) * 100)
        setProgress(progress)
    }

    const renderQuestions = () => {
        let exit = false
        const questionElements = questions.map((question, key) => {
            if (exit) {
                return null
            }
            if (key === 0) {
                return addQuestion(question, key, updateAnswer)
            } else {
                if (Array.isArray(formAnswers[key - 1])) {
                    if (formAnswers[key - 1].length > 0) {
                        return addQuestion(question, key, updateAnswer)
                    }
                } else if (formAnswers[key - 1]) {
                    return addQuestion(question, key, updateAnswer)
                } else {
                    exit = true
                    return null
                }
            }
        })

        const submitButton = (
            <Button onClick={handleSubmit} className="w-3/4 lg:w-1/3 xl:w-1/4 mt-8">
                Submit
            </Button>
        )

        return [...questionElements, submitButton]
    }

    const handleSubmit = async () => {
        // Checks if at least one answer is null, if so, alert the user
        if (formAnswers.some((answer) => answer === null)) {
            alert("Please answer all questions before submitting.")
            return
        }

        const payload = {
            formAnswers,
        }

        // Choose the API endpoint based on the URL the user is on
        const apiUrl = import.meta.env.VITE_API_URL
        if (UrlLocation.pathname.includes("/lost")) {
            var endpoint = "lost"
        } else if (UrlLocation.pathname.includes("/found")) {
            var endpoint = "found"
        }

        try {
            // Send the form data to the API
            const response = await fetch(`${apiUrl}/${endpoint}`, {
                method: "POST",
                // Do I need headers here? //////////////////////////
                body: JSON.stringify(payload),
            })

            // Handle the response
            if (response.ok) {
                alert("Form submitted successfully.")
            } else {
                const error = await response.json()
                alert(`Error submitting form: ${error.message}`)
            }
        } catch (error) {
            alert(`Error submitting form: ${error.message}`)
        }
    }

    return (
        <div className={`${className} relative flex items-center`}>
            <ProgressBar progress={progress} />
            <div className="mt-32 w-full max-w-7xl">{renderQuestions()}</div>
            <div ref={ref}></div>
        </div>
    )
}

export default Form
