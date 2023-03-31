import React from "react"
import { Button, MediumText, BigText, SmallText } from "../components"
import Page from "../components/Page"

const AboutPage = () => {
    return (
        <Page className="h-auto min-h-screen bg-background flex flex-col items-center px-6 lg:px-16">
            <BigText className="text-center mt-12 lg:mt-20">O aplikaciji</BigText>
            <MediumText className="mx-2 mt-12 lg:w-3/4 text-left font-semibold">
                Dobrodošli na "Lost & Found", inovativnu aplikaciju koja vam pruža jednostavno i učinkovito rješenje za pronalaženje
                izgubljenih predmeta ili vraćanje pronađenih stvari. Zaboravite na neorganizirane forume i nepregledne objave na društvenim
                mrežama. Naša aplikacija omogućuje brzo i precizno povezivanje osoba koje su izgubile ili pronašle predmete, a sve to
                potpuno besplatno i dostupno putem preglednika na bilo kojem uređaju. Trenutačno smo fokusirani na područje grada Zagreba, s
                ambicioznim planovima za širenje na cijelu Hrvatsku.
            </MediumText>
            <MediumText className="mx-2 mt-8 lg:w-3/4 text-left font-semibold">
                Koristeći našu aplikaciju, samo nekoliko koraka dijeli vas od rješavanja problema izgubljenih ili pronađenih stvari. Klikom
                na gumbe "Izgubio sam nešto" ili "Pronašao sam nešto" otvara se jednostavan upitnik u kojem unesete detaljne informacije o
                predmetu. Naša intuitivna platforma i napredni algoritam obavit će ostatak posla, povezujući vas s osobom koja je izgubila
                ili pronašla vaš predmet. Ne morate brinuti o sigurnosti svojih informacija - svaki podnesak je identificiran jedinstvenim
                ključem za praćenje, a kreiranje korisničkog računa nije potrebno.
            </MediumText>
            <MediumText className="mx-2 mt-8 lg:w-3/4 text-left font-semibold">
                Razvili smo sofisticirani algoritam koji osigurava brzo i točno povezivanje korisnika temeljem unesenih podataka. Svi
                podnesci pohranjuju se u sigurnoj i zaštićenoj bazi podataka te se koriste isključivo u svrhu povezivanja korisnika.
                Aplikacija je dizajnirana kako bi osigurala sigurnost, privatnost i zadovoljstvo naših korisnika.
            </MediumText>
            <MediumText className="mx-2 mt-8 lg:w-3/4 text-left font-semibold">
                U slučaju pitanja ili potrebe za podrškom, naš za korisničku podršku uvijek je spreman pomoći. Posjetite našu stranicu za
                kontakt kako biste pronašli sve potrebne informacije za komunikaciju s nama. Vaša sigurnost i zadovoljstvo su nam prioritet,
                stoga svaki ključ za praćenje osigurava jedinstvenu zaštitu vaših podataka. Budite uvjereni da ste s "Lost & Found"
                aplikacijom u dobrim rukama.
            </MediumText>
            <Button link="/contact" className="mt-12 w-3/4 lg:w-1/3 xl:w-1/4 self-center">
                <SmallText className="text-background select-none">Kontaktirajte nas</SmallText>
            </Button>
        </Page>
    )
}

export default AboutPage
