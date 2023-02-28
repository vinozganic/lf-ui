import React, { useState } from "react"
import { Page } from "../components"
import addColourPicker from "../components/forms/ColourPicker"
import Form from "../components/forms/Form"
import addMultipleChoiceQuestion from "../components/forms/MultipleChoice"
import addSingleChoiceQuestion from "../components/forms/SingleChoice"

const questions = [
    {
        create: addMultipleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addColourPicker,
        text: "Ovo je tekst pitanja",
        options: "",
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addMultipleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addColourPicker,
        text: "Ovo je tekst pitanja",
        options: "",
    },
    {
        create: addSingleChoiceQuestion,
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
