import React from "react"
import { Button, SmallText, MediumText, BigText } from "../components"
import Page from "../components/Page"

const PrivacyPage = () => {
    return (
        <Page className="h-auto min-h-screen bg-background flex flex-col items-center px-6 lg:px-16">
            <BigText className="text-center mt-16 lg:mt-20">Prikupljanje podataka</BigText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Uvod</MediumText>
            <SmallText className="mx-2 mt-5 lg:w-3/4 text-left font-medium">
                Dobrodošli na stranicu s politikom privatnosti "Lost & Found" aplikacije. U nastavku ćete pronaći detaljne informacije o
                našim praksama prikupljanja, upotrebe, zaštite i pohrane vaših osobnih podataka. Molimo vas da pažljivo pročitate ovu
                politiku kako biste razumjeli naše postupke i vaša prava u vezi s vašim osobnim podacima.
            </SmallText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Prikupljanje podataka</MediumText>
            <SmallText className="mx-2 mt-5 lg:w-3/4 text-left font-medium">
                Kada koristite našu aplikaciju, prikupljamo sljedeće osobne podatke od vas:
            </SmallText>
            <SmallText className="mx-2 mt-2 lg:w-3/4 text-left font-medium">
                <ul className="list-disc list-inside custom-bullet-color">
                    <li>
                        <span className="font-bold">Broj telefona:</span>{" "}
                        <span className="font-medium">
                            Kako bismo vam omogućili komunikaciju s drugim korisnicima u vezi s izgubljenim ili pronađenim predmetima,
                            prikupljamo vaš broj telefona.
                        </span>
                    </li>
                    <li>
                        <span className="font-bold">Lokacija na kojoj ste pronašli ili izgubili predmet:</span>{" "}
                        <span className="font-medium">
                            Prikupljanje informacija o točnoj lokaciji ili području kretanja osobe pomaže nam u preciznom povezivanju
                            korisnika koji su izgubili ili pronašli predmete.
                        </span>
                    </li>
                </ul>
            </SmallText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Upotreba podataka</MediumText>
            <SmallText className="mx-2 mt-5 lg:w-3/4 text-left font-medium">
                Prikupljeni podaci se koriste u našem algoritmu kako bi se povezali odgovarajući korisnici koji su izgubili ili pronašli
                predmet. Naš algoritam koristi vašu lokaciju u trenutku pronalaska ili gubitka predmeta kako bi pružio što preciznije
                podudaranje između izgubljenih i pronađenih predmeta. Također, vaše podatke koristimo kako bismo poboljšali našu aplikaciju,
                analizirali njenu upotrebu i pružili vam bolje korisničko iskustvo.
            </SmallText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Zaštita podataka</MediumText>
            <SmallText className="mx-2 mt-4 lg:w-3/4 text-left font-medium">
                Vaša sigurnost i zaštita vaših osobnih podataka su nam od najveće važnosti. Kako bismo zaštitili vaše osobne podatke,
                poduzimamo sljedeće sigurnosne mjere:
            </SmallText>
            <SmallText className="mx-2 mt-2 lg:w-3/4 text-left font-medium">
                <ul className="list-disc custom-bullet-color list-inside">
                    <li>
                        <span className="font-bold">Enkripcija podataka:</span>{" "}
                        <span className="font-medium">Svi vaši osobni podaci su zaštićeni enkripcijom tijekom prijenosa i pohrane.</span>
                    </li>
                    <li>
                        <span className="font-bold">Jedinstveni ključevi za praćenje:</span>{" "}
                        <span className="font-medium">
                            Koristimo jedinstvene ključeve za praćenje koji osiguravaju da su vaši podaci sigurni i zaštićeni od
                            neovlaštenog pristupa.
                        </span>
                    </li>
                    <li>
                        <span className="font-bold">Redovite sigurnosne provjere i nadogradnje:</span>{" "}
                        <span className="font-medium">
                            Provodimo redovite provjere sigurnosti i nadogradnje kako bismo osigurali najvišu razinu zaštite vaših podataka.
                        </span>
                    </li>
                </ul>
            </SmallText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Prava korisnika</MediumText>
            <SmallText className="mx-2 mt-4 lg:w-3/4 text-left font-medium">
                Korisnici imaju pravo pristupiti svojim podacima, ali nemaju mogućnost izmjene tih podataka. Ako želite pristupiti svojim
                podacima, možete to učiniti putem naše korisničke službe. Također, ako smatrate da vaši podaci nisu točni ili su nepotpuni,
                možete zatražiti ispravak ili dopunu podataka. U slučaju da želite brisanje svojih podataka, imate pravo zatražiti brisanje
                podataka. Međutim, imajte na umu da brisanje podataka može utjecati na vašu sposobnost korištenja aplikacije "Lost & Found"
                u budućnosti. Ako želite ograničiti obradu vaših podataka, možete zatražiti ograničenje obrade. Ovo pravo vam omogućuje da
                ograničite način na koji se vaši podaci koriste, ali ne utječe na vašu sposobnost korištenja aplikacije.
            </SmallText>
            <MediumText className="mx-2 mt-16 lg:w-3/4 text-left font-semibold text-primary">Informacije o kontaktu</MediumText>
            <SmallText className="mx-2 mt-4 lg:w-3/4 text-left font-medium">
                Ako imate bilo kakvih pitanja ili nedoumica u vezi s našom politikom privatnosti, obradom vaših osobnih podataka ili ako
                želite ostvariti svoja prava, slobodno nas kontaktirajte putem naše kontaktne stranice. Naša podrška će vam rado pomoći i
                pružati sve potrebne informacije. Zahvaljujemo vam što koristite "Lost & Found" aplikaciju i povjeravate nam svoje osobne
                podatke. Vaša sigurnost i zaštita vaših podataka uvijek će biti naš najveći prioritet.
            </SmallText>
            <Button link="/contact" className="mt-8 w-3/4 lg:w-1/3 xl:w-1/4 self-left">
                <SmallText className="text-background select-none">Kontaktirajte nas</SmallText>
            </Button>
        </Page>
    )
}

export default PrivacyPage
