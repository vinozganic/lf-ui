import React from "react"
import { Button, MediumText, SmallText, Page, TrackingKeyInput } from "../components"

const HomePage = () => {
    return (
        <Page
            bgClassName="bg-vertical lg:bg-horizontal bg-cover bg-no-repeat lg:bg-fixed"
            className="h-auto flex flex-col items-center px-6 lg:px-16">
            <img src="/images/logo.png" className="w-64 lg:w-1/4 mt-4 " />
            <MediumText className="mt-14 lg:mt-20 md:w-3/4 lg:w-1-2 text-xl md:text-3xl text-center text-shadow-lg">
                Ostala ti je torba u tramvaju? Pronašao/la si slušalice u teretani?
            </MediumText>
            <MediumText className="mx-4 mt-2 md:w-3/4 lg:w-1-2 text-xl md:text-3xl text-center text-shadow-lg">
                Pronađi izgubljene predmete u nekoliko klikova.
            </MediumText>
            <div className="flex flex-col justify-center gap-y-8 gap-4 lg:gap-16 xl:gap-32 mt-12 lg:mt-14 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8  gap-x-4 lg:gap-16 xl:gap-32">
                    <Button link="/lost" className="w-5/6 sm:w-2/3 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Izgubio sam nešto</SmallText>
                    </Button>
                    <Button link="/found" className="w-5/6 sm:w-2/3 lg:w-1/3 xl:w-1/4">
                        <SmallText className="text-background select-none">Pronašao sam nešto</SmallText>
                    </Button>
                </div>
            </div>
            <TrackingKeyInput length={8} className="mt-10 md:mt-14" />
        </Page>
    )
}

export default HomePage
