import {
    addColorPickerQuestion,
    addDatePickerQuestion,
    addLocationSelectQuestion,
    addPhoneNumberQuestion,
    Form,
    Page,
    addTypePicker
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
                type="lost"
                className="w-full md:w-3/4 xl:w-2/3 flex flex-col items-center gap-y-12 "
            />
        </Page>
    )
}

export default FoundPage
