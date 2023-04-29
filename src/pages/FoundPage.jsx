import {
    addColorPickerQuestion,
    addDatePickerQuestion,
    addLocationSelectQuestion,
    addSingleChoiceQuestion,
    addPhoneNumberQuestion,
    Form,
    Page,
} from "../components"

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
            clothes: [
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
            tech: [
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
        create: addColorPickerQuestion,
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
        create: addPhoneNumberQuestion,
        text: "Unesi svoj broj telefona.",
        fieldName: "phoneNumber",
    },
]

const FoundPage = () => {
    return (
        <Page bgClassName="bg-formVertical lg:bg-formHorizontal bg-cover bg-center bg-fixed bg-no-repeat" className="flex justify-center overflow-y-auto">
            <Form
                text="Pred tobom se nalazi nekoliko pitanja. Pokušaj što preciznije odgovoriti na svako od njih. Što preciznije odgovoriš, veće su šanse da pronađeš vlasnika."
                questions={questions}
                type="found"
                className="w-full md:w-3/4 xl:w-2/3 flex flex-col items-center gap-y-12 "
            />
        </Page>
    )
}

export default FoundPage
