import React from "react"
import { Button, MediumText, SmallText, VeryBigText } from "../components"
import Page from "../components/Page"

const HomePage = () => {
    return (
        <Page className="h-auto min-h-screen bg-vertical lg:bg-horizontal bg-cover bg-no-repeat flex flex-col items-center justify-center px-6 lg:px-16">
            <VeryBigText className="text-center drop-shadow-lg">Lost & Found</VeryBigText>
            <MediumText className="mx-2 mt-12 lg:w-1/2 text-center drop-shadow-lg">
                Ostavio si torbu u tramvaju? Ostala ti je majica u teretani? Pronađi izgubljene predmete u nekoliko klikova.
            </MediumText>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 xl:gap-24 mt-32 lg:mt-48 w-full">
                <Button link="/lost" className="w-3/4 lg:w-1/2 xl:w-1/4">
                    <SmallText className="text-background select-none">Izgubio sam nešto</SmallText>
                </Button>
                <Button link="/found" className="w-3/4 lg:w-1/2 xl:w-1/4">
                    <SmallText className="text-background select-none">Pronašao sam nešto</SmallText>
                </Button>
            </div>
        </Page>
    )
}

export default HomePage
