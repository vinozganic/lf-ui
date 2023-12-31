import React from "react"
import { Button, BigText, MediumText, Page } from "../components"

const ContactPage = () => {
    return (
        <Page
            bgClassName="bg-contactVertical lg:bg-contactHorizontal bg-cover bg-no-repeat lg:bg-fixed"
            className="flex flex-col items-center px-6 lg:px-16">
            <BigText className="mt-8 lg:mt-20 lg:text-center text-center text-4xl mb-10 lg:mb-4">Kontaktirajte nas</BigText>
            <MediumText className="lg:mt-8 flex flex-col justify-center items-center mb-4 lg:mb-0">
                Email adresa:{" "}
                <a href="mailto:jakov.vinozganic@fer.hr" className="text-primary font-medium">
                    jakov.vinozganic@fer.hr
                </a>
            </MediumText>
            <MediumText className="lg:mt-4 flex flex-col justify-center items-center mb-4 lg:mb-0">
                <a>Telefon: </a>
                <a href="tel:+395123456789" className="text-primary font-medium">
                    +385 95 5069 335
                </a>
            </MediumText>
            <div className="lg:flex lg:items-center flex flex-col justify-center items-center mb-4">
                <MediumText className="lg:mt-4">Adresa:</MediumText>
                <div className="mx-1"></div>
                <MediumText className=" text-primary text-center font-medium">Unska ulica 3, 10000 Zagreb, Hrvatska</MediumText>
            </div>
            <div className="lg:mt-4 lg:flex lg:items-center flex flex-row justify-center items-center mb-9">
                <div className="lg:flex lg:items-center lg:justify-center lg:mt-1.5">
                    <InstagramIcon className="w-14 h-14 " />
                </div>
                <MediumText className="text-primary mb-1">U izradi...</MediumText>
            </div>
            <Button link="mailto:jakov.vinozganic@fer.hr" className="lg:mt-0 w-3/4 lg:w-1/3">
                <MediumText className="text-background lg:text-xl text-xl ">Kontaktirajte nas</MediumText>
            </Button>
        </Page>
    )
}

const InstagramIcon = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="128px" height="128px">
            <path
                style={{ fill: "none", stroke: "rgba(255, 255, 255, 0.9)", strokeWidth: 2, strokeMiterlimit: 10 }}
                d="M11.455,26h9.091C23.558,26,26,23.558,26,20.545v-9.091C26,8.442,23.558,6,20.545,6h-9.091C8.442,6,6,8.442,6,11.455v9.091C6,23.558,8.442,26,11.455,26z"
            />
            <circle
                style={{ fill: "none", stroke: "rgba(255, 255, 255, 0.9)", strokeWidth: 2, strokeMiterlimit: 10 }}
                cx="16"
                cy="16"
                r="5"
            />
            <circle cx="21.909" cy="10.091" r="0.909" />
        </svg>
    )
}

export default ContactPage
