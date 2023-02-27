import React, { useState } from "react"

const Form = ({ questions }) => {
    const [formAnswers, setFormAnswers] = useState(questions.map((item) => null))

    const addQuestion = (questionObject, key, updateAnswer) => {
        const questionElement = questionObject.create(questionObject.text, questionObject.options, key, updateAnswer)
        return questionElement
    }

    const updateAnswer = (answer, key) => {
        setFormAnswers((prev) => prev.map((item, i) => (i === key ? answer : item)))
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
                    exit = true
                    return null
                } else if (formAnswers[key - 1]) {
                    return addQuestion(question, key, updateAnswer)
                }
                exit = true
                return null
            }
        })
    }

    return <>{renderQuestions()}</>
}

export default Form
