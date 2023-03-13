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
        options: ["test", "test2", "test3", "test4", "test5"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["test", "test2", "test3"],
    },
]

const FoundPage = () => {
    return (
        <Page className="h-auto min-h-screen flex justify-center overflow-y-auto">
            <Form questions={questions} className="w-full md:w-3/4 xl:w-2/3 flex flex-col gap-y-12 " />
        </Page>
    )
}
export default FoundPage
