import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { SmallText } from "../components"

function TopBar() {
    const [activeLink, setActiveLink] = useState("")
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.pageYOffset > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav
            className={`bg-background fixed w-full top-0 z-50 py-3 transition-colors duration-300 ease-in-out border-b-2 border-primary/40 `}>
            <div className="mx-6 lg:mx-10">
                <div className="flex justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src="images/long-logo.png" className="hover:scale-105 h-6 lg:h-7 pl-0 ml-0 transition duration-300" />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/about"
                            className={`mr-6 ${activeLink === "about" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("about")}>
                            <SmallText className={`text-white hover:scale-105 transition duration-300`}>O aplikaciji</SmallText>
                        </Link>
                        <Link
                            to="/privacy"
                            className={`mr-6 ${activeLink === "services" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("services")}>
                            <SmallText className={`text-white hover:scale-105 transition duration-300`}>Prikupljanje podataka</SmallText>
                        </Link>
                        <Link
                            to="/contact"
                            className={` ${activeLink === "contact" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("contact")}>
                            <SmallText className={`text-white hover:scale-105 transition duration-300`}>Kontakt</SmallText>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar
