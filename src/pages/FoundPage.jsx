import React, { useState } from "react"
import { addDatePicker, Page } from "../components"
import addColourPicker from "../components/forms/ColourPicker"
import Form from "../components/forms/Form"
import addLocationSelectQuestion from "../components/forms/LocationSelect"
import addMultipleChoiceQuestion from "../components/forms/MultipleChoice"
import addSingleChoiceQuestion from "../components/forms/SingleChoice"
import addDatePickerQuestion from "../components/forms/DatePicker"

const questions = [
    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["tech", "clothes", "misc"],
        fieldName: "type",
    },

    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["shirt", "subtype1", "subtype1"],
        fieldName: "subtype",
    },

    {
        create: addColourPicker,
        text: "Ovo je tekst pitanja",
        fieldName: "color",
    },

    {
        create: addDatePickerQuestion,
        text: "Ovo je tekst pitanja",
        fieldName: "date",
    },

    {
        create: addLocationSelectQuestion,
        text: "Ovo je tekst pitanja",
        options: {
            mapCenter: [45.813, 15.977],
        },
        fieldName: "location",
    },

    {
        create: addSingleChoiceQuestion,
        text: "Ovo je tekst pitanja",
        options: ["true", "false"],
        fieldName: "identifiable",
    },
]

const FoundPage = () => {
    return (
        <Page className="h-auto min-h-screen flex justify-center overflow-y-auto">
            <Form questions={questions} type="found" className="w-full md:w-3/4 xl:w-2/3 flex flex-col gap-y-12 " />
        </Page>
    )
}
export default FoundPage
