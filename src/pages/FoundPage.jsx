import React, { useState } from "react"
import { addDatePicker, BigText, Page } from "../components"
import addColourPicker from "../components/forms/ColourPicker"
import Form from "../components/forms/Form"
import addLocationSelectQuestion from "../components/forms/LocationSelect"
import addMultipleChoiceQuestion from "../components/forms/MultipleChoice"
import addSingleChoiceQuestion from "../components/forms/SingleChoice"
import addDatePickerQuestion from "../components/forms/DatePicker"

const questions = [
    {
        create: addSingleChoiceQuestion,
        text: "Odaberi tip nađenog predmeta",
        options: ["tech", "clothes", "misc"],
        fieldName: "type",
    },
    {
        create: addSingleChoiceQuestion,
        dependsOn: "type",
        text: "Odaberi podtip. Ako nije ponuđen, odaberi 'other'",
        options: {
            tech: [
                "tshirt",
                "shirt",
                "lstshirt",
                "trousers",
                "jeans",
                "shorts",
                "sweatpants",
                "sweatshirt",
                "jacket",
                "cap",
                "hat",
                "scarf",
                "gloves",
                "belt",
                "skirt",
                "dress",
                "sneakers",
                "shoes",
                "boots",
                "underpants",
                "socks",
                "other",
            ],
            clothes: [
                "mobilePhone",
                "laptop",
                "tablet",
                "smartWatch",
                "usbstick",
                "wiredHeadphones",
                "wirelessHeadphones",
                "camera",
                "mouse",
                "keyboard",
            ],
            misc: [
                "ring",
                "necklace",
                "earring",
                "anklet",
                "bracelet",
                "chain",
                "sunglasses",
                "glasses",
                "umbrella",
                "keys",
                "book",
                "wristwatch",
                "ball",
                "pillow",
                "racket",
                "bat",
                "skis",
                "wallet",
                "bag",
                "purse",
                "backpack",
                "idCard",
                "drivingLicense",
                "passport",
                "guitar",
                "violin",
                "accordion",
                "other",
            ],
        },
        fieldName: "subtype",
    },
    {
        create: addColourPicker,
        text: "Koje boje je pronađeni predmet. Pokušaj što preciznije odrediti boju.",
        fieldName: "color",
    },
    {
        create: addDatePickerQuestion,
        text: "Kada si, otprilike, pronašao/la predmet?",
        fieldName: "date",
    },
    {
        create: addLocationSelectQuestion,
        text: "Gdje si pronašao/la predmet?",
        options: {
            mapCenter: [45.813, 15.977],
        },
        fieldName: "location",
    },
    {
        create: addSingleChoiceQuestion,
        text: "Može li se prema izgubljenom predmetu utvrditi identitet vlasnika? Npr. negdje piše ime.",
        options: ["true", "false"],
        fieldName: "identifiable",
    },
]

const FoundPage = () => {
    return (
        <Page className="h-auto min-h-screen flex justify-center overflow-y-auto">
            <Form
                text="Pred tobom se nalazi nekoliko pitanja. Pokušaj što preciznije odgovoriti na svako od njih. Što preci"
                questions={questions}
                type="found" className="w-full md:w-3/4 xl:w-2/3 flex flex-col gap-y-12 "
            />
        </Page>
    )
}

export default FoundPage