import { React } from "react"
import Button from "./Button"
import { SmallText } from "./"

const ResolvedModal = ({ setVisible, resolveItem, body }) => {
    const handleResolveItem = () => {
        resolveItem(body)
    }

    const handleCloseChange = () => {
        setVisible(false)
    }

    return (
        <div className="px-4 fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 select-none backdrop-blur-sm">
            <div className="w-full md:w-1/2 relative p-10 border-2 border-gray bg-gray/80 rounded-xl">
                <div className="p-6 pt-8 text-2xl font-bold">
                    {body?.foundId ? (
                        <SmallText>Jeste li sigurni da želite označiti predmet kao pronađen uz pomoć ovog spoja?</SmallText>
                    ) : (
                        <SmallText>
                            Ukoliko ste pronašli predmet uz pomoć ove aplikacije, molimo Vas da kliknete na{" "}
                            <u>Slučaj je riješen pomoću ovog spoja</u> na kartici spoja. Ukoliko ste pronašli predmet na drugi način,
                            kliknite <u>Nastavi</u> u nastavku.
                        </SmallText>
                    )}
                </div>
                <div className="flex justify-evenly pb-4">
                    <Button onClick={handleResolveItem} className="w-2/5 text-xl font-bold mx-4">
                        Nastavi
                    </Button>
                    <Button onClick={handleCloseChange} className="w-2/5 text-xl font-bold mx-4">
                        Vrati se
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ResolvedModal
