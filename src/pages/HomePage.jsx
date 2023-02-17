import React from "react"
import BigText from "../components/BigText"
import Page from "../components/Page"
import SmallText from "../components/SmallText"

const HomePage = () => {
    return (
        <Page>
            <BigText className="text-left ">Ostavio/la si ruksak u tramvaju? Saznaj u par klikova gdje je.</BigText>
            <SmallText className="text-center mr-56">Small text</SmallText>
        </Page>
    )
}

export default HomePage
