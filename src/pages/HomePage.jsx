import React from "react"
import { Button, MediumText, VeryBigText } from "../components"
import Page from "../components/Page"

const HomePage = () => {
    return (
        <Page className="h-auto min-h-screen bg-vertical lg:bg-horizontal bg-cover bg-no-repeat flex flex-col items-center px-6 lg:px-16">
            <VeryBigText className="text-pink text-center">Lost & Found</VeryBigText>
            <MediumText className="mx-2 mt-12 lg:w-1/2 text-center">
                Ostavio si torbu u tramvaju? Ostala ti je majica u teretani? Pronađi izgubljene predmete u nekoliko klikova.
            </MediumText>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 mt-20 lg:mt-40 w-full">
                <Button link="/lost" className="w-3/4 lg:w-1/4">
                    Izgubio sam nešto
                </Button>
                <Button link="/found" className="w-3/4 lg:w-1/4">
                    Pronašao sam nešto
                </Button>
            </div>
        </Page>
    )
}

export default HomePage
