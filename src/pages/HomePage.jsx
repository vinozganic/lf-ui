import React from "react"
import { Button, MediumText, SmallText, VeryBigText } from "../components"
import TrackingKeyInput from "../components/forms/TrackingKeyInput"
import Page from "../components/Page"

const HomePage = () => {
    return (
        <Page
            bgClassName="bg-vertical lg:bg-horizontal bg-cover bg-no-repeat bg-fixed"
            className="h-auto flex flex-col items-center px-6 lg:px-16">
            <img src="/images/logo.png" className="w-64 lg:w-1/4 mt-4 lg:mt-12" />
            <MediumText className="mx-8 mt-14 lg:mt-20 md:w-3/4 lg:w-1-2 text-left text-shadow-lg">
                Ostavio si torbu u tramvaju? Ostala ti je majica u teretani? Pronađi izgubljene predmete u nekoliko klikova.
            </MediumText>
            <div className="flex flex-col justify-center gap-y-8 gap-4 lg:gap-16 xl:gap-32 mt-24 lg:mt-40 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8  gap-x-4 lg:gap-16 xl:gap-32">
                    <Button link="/lost" className="w-full sm:w-2/3 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Izgubio sam nešto</SmallText>
                    </Button>
                    <Button link="/found" className="w-full sm:w-2/3 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Pronašao sam nešto</SmallText>
                    </Button>
                </div>
            </div>
            <TrackingKeyInput length={8} className="mt-20 md:mt-32" />
        </Page>
    )
}

export default HomePage
