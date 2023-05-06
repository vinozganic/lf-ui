import { Link } from "react-router-dom"
import { SmallText } from "../components"

const Footer = () => {
    return (
        <>
            <footer className="footer mt-20 w-full flex flex-col border-primary/40 border-t-2 bg-background bg-opacity-80">
                <div className="mt-7 mb-7 xl:max-w-2/3 bg-transparent mx-8 lg:mx-20 gap-4 grid grid-cols:1 lg:grid-cols-3">
                    <Link to="/about">
                        <SmallText className="text-white font-semibold lg:text-center hover:underline hover:scale-105 transition duration-300">
                            O aplikaciji
                        </SmallText>
                    </Link>
                    <Link to="/privacy">
                        <SmallText className="text-white font-semibold lg:text-center hover:underline hover:scale-105 transition duration-300">
                            Prikupljanje podataka
                        </SmallText>
                    </Link>
                    <Link to="/contact">
                        <SmallText className="text-white font-semibold lg:text-center hover:underline hover:scale-105 transition duration-300">
                            Kontakt
                        </SmallText>
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer
