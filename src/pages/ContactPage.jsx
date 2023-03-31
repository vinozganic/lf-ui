import React from "react"
import { Button, BigText, MediumText } from "../components"
import Page from "../components/Page"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

const ContactPage = () => {
    return (
        <Page className="h-auto min-h-screen flex flex-col items-center px-6 lg:px-16">
            <BigText className="mt-12 lg:mt-20 text-center">Kontaktirajte nas</BigText>
            <MediumText className="mt-8">
                Email adresa:{" "}
                <a href="mailto:contact@lostandfound.com" className="text-primary">
                    contact@lostandfound.com
                </a>
            </MediumText>
            <MediumText className="mt-4">
                Telefon:{" "}
                <a href="tel:+395123456789" className={"text-primary"}>
                    +395 123 456 789
                </a>
            </MediumText>
            <div className="flex items-center">
                <MediumText className="mt-4">Adresa:</MediumText>
                <div className="mx-1"></div>
                <MediumText className="mt-4 text-primary">Random Adresa, 10000 Zagreb, Hrvatska</MediumText>
            </div>
            <div className="mt-4 flex items-center">
                <FontAwesomeIcon icon={faInstagram} size="3x" className="mr-2" />
                <MediumText className="text-primary">@lostandfoundapp</MediumText>
            </div>
            <Button link="mailto:contact@lostandfound.com" className="mt-8 w-3/4 lg:w-1/3">
                <MediumText className="text-background select-none">Kontaktirajte nas</MediumText>
            </Button>
        </Page>
    )
}

export default ContactPage
