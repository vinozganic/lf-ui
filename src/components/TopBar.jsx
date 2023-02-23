import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SmallText from "./SmallText"

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
            className={`${
                isSticky ? "bg-black" : "bg-transparent"
            } fixed w-full top-0 z-50 py-4 transition-colors duration-300 ease-in-out `}>
            <div className="mx-8 lg:mx-16">
                <div className="flex justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-bold text-2xl hover:underline transition duration-300">
                            <SmallText className="text-pink">Lost & Found</SmallText>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/about"
                            className={`mr-6 ${activeLink === "about" && "underline"}`}
                            onClick={() => setActiveLink("about")}>
                            <SmallText className="text-gray-300 hover:text-primary transition duration-300">O aplikaciji</SmallText>
                        </Link>
                        <Link
                            to="/privacy"
                            className={`mr-6 ${activeLink === "services" && "underline"}`}
                            onClick={() => setActiveLink("services")}>
                            <SmallText className="text-gray-300 hover:text-primary transition duration-300">
                                Prikupljanje podataka
                            </SmallText>
                        </Link>
                        <Link
                            to="/contact"
                            className={` ${activeLink === "contact" && "underline"}`}
                            onClick={() => setActiveLink("contact")}>
                            <SmallText className="text-gray-300 hover:text-primary transition duration-300">Kontakt</SmallText>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar
