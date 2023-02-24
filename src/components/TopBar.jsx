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
                isSticky ? "bg-black bg-opacity-90" : "bg-transparent"
            } fixed w-full top-0 z-50 py-4 transition-colors duration-300 ease-in-out border-opacity-50 border-b-2 border-black `}>
            <div className="mx-8 lg:mx-16">
                <div className="flex justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white hover:underline font-bold text-2xl transition duration-300">
                            <SmallText className={`${isSticky ? "text-pink" : "text-black"} hover:scale-105 transition duration-300`}>
                                Lost & Found
                            </SmallText>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        <Link
                            to="/about"
                            className={`mr-6 ${activeLink === "about" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("about")}>
                            <SmallText className={`${isSticky ? "text-pink" : "text-black"} transition duration-300`}>
                                O aplikaciji
                            </SmallText>
                        </Link>
                        <Link
                            to="/privacy"
                            className={`mr-6 ${activeLink === "services" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("services")}>
                            <SmallText className={`${isSticky ? "text-pink" : "text-black"} transition duration-300`}>
                                Prikupljanje podataka
                            </SmallText>
                        </Link>
                        <Link
                            to="/contact"
                            className={` ${activeLink === "contact" && "underline"} hover:underline`}
                            onClick={() => setActiveLink("contact")}>
                            <SmallText className={`${isSticky ? "text-pink" : "text-black"} transition duration-300`}>Kontakt</SmallText>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopBar
