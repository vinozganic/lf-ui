import React, { useEffect, useRef, useState } from "react"
import ProgressBar from "./ProgressBar"

const Form = ({ questions, className }) => {
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
        return questions.map((question, key) => {
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
    }

    return (
        <div className={`${className} relative flex items-center`}>
            <ProgressBar
                progress={progress}
                className={`fixed top-12 p-12 w-full max-w-3xl bg-gradient-to-b from-background via-background to-transparent duration-300 ease-in-out`}
            />
            <div className="mt-32 overflow-auto scrollbar-hide w-full max-w-3xl">{renderQuestions()}</div>
            <div ref={ref}></div>
        </div>
    )
}

export default Form
