import React, { useState } from "react"
import { Page } from "../components"
import addColourPicker from "../components/forms/ColourPicker"
import Form from "../components/forms/Form"
import addLocationSelectQuestion from "../components/forms/LocationSelect"
import addMultipleChoiceQuestion from "../components/forms/MultipleChoice"
import addSingleChoiceQuestion from "../components/forms/SingleChoice"

const questions = [
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["Opcija 1", "Opcija 2", "Opcija 3"],
    },

    {
        create: addLocationSelectQuestion,
        text: "Ovo je tekst pitanja",
        options: {
            mapCenter: [45.813, 15.977],
        },
    },
]

const FoundPage = () => {
    return (
        <Page className="h-auto min-h-screen flex justify-center overflow-y-auto">
            <Form questions={questions} className="w-full md:w-3/4: xl:w-2/3 flex flex-col gap-y-12" />
        </Page>
    )
}
export default FoundPage
