import React from "react"
import { Button, MediumText, SmallText, VeryBigText } from "../components"
import TrackingKeyInput from "../components/forms/TrackingKeyInput"
import Page from "../components/Page"

const HomePage = () => {
    return (
        <Page className="h-auto min-h-screen bg-vertical lg:bg-horizontal bg-cover bg-no-repeat flex flex-col items-center px-6 lg:px-16">
            <VeryBigText className="text-center  lg:mt-20">Lost & Found</VeryBigText>
            <MediumText className="mx-2 mt-12 lg:w-1/2 text-center drop-shadow-lg">
                Ostavio si torbu u tramvaju? Ostala ti je majica u teretani? Pronađi izgubljene predmete u nekoliko klikova.
            </MediumText>
            <div className="flex flex-col justify-center gap-y-8 gap-4 lg:gap-16 xl:gap-32 mt-20 lg:mt-40 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8  gap-x-4 lg:gap-16 xl:gap-32">
                    <Button link="/lost" className="w-3/4 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Izgubio sam nešto</SmallText>
                    </Button>
                    <Button link="/found" className="w-3/4 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Pronašao sam nešto</SmallText>
                    </Button>
                </div>
            </div>
            <TrackingKeyInput length={8} className="mt-8 md:mt-20"/>
        </Page>
    )
}

export default HomePage
