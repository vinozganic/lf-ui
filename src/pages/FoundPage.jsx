import React, { useState } from "react"
import { Page } from "../components"
import Form from "../components/forms/Form"
import addMultipleChoiceQuestion from "../components/forms/MultipleChoice"

const questions = [
    {
        create: addMultipleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addMultipleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addMultipleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
]

const FoundPage = () => {
    return (
        <Page>
            <Form questions={questions} />
        </Page>
    )
}
export default FoundPage
