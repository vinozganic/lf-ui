import {
    addColorPickerQuestion,
    addDatePickerQuestion,
    addLocationSelectQuestion,
    addPhoneNumberQuestion,
    Form,
    Page,
    addTypePicker,
} from "../components"

const questions = [
    {
        create: addTypePicker,
        text: "Kojeg je tipa izgubljeni predmet?",
        fieldName: "type",
    },
    {
        create: addColorPickerQuestion,
        text: "Koje boje je izgubljeni predmet. Pokušaj što preciznije odrediti boju.",
        fieldName: "color",
    },
    {
        create: addDatePickerQuestion,
        text: "Kada si, otprilike, izgubio/la predmet?",
        fieldName: "date",
    },
    {
        create: addLocationSelectQuestion,
        text: "Gdje si izgubio/la predmet?",
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
        <Page
            bgClassName="lg:bg-formHorizontal lg:bg-cover lg:bg-center lg:bg-fixed lg:bg-no-repeat"
            className="flex justify-center overflow-y-auto">
            <Form
                text="Pokušaj što preciznije odgovoriti na sljedeća pitanja. To će nam pomoći da pronađemo izgubljeni predmet."
                questions={questions}
                type="lost"
                className="w-full md:w-3/4 xl:w-2/3 flex flex-col items-center"
            />
        </Page>
    )
}

export default FoundPage
