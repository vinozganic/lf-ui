import React from "react"
import { Link } from "react-router-dom"

const Button = ({ children, onClick, className, link, style, buttonClassName }) => {
    const button = (
        <button
            onClick={onClick}
            type="button"
            className={`text-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-100
                        font-semibold px-2 py-2 w-full border-2 border-primary
                        bg-primary rounded-3xl hover:bg-opacity-80 shadow-button ${buttonClassName}`}
            style={style}>
            {children}
        </button>
    )

    return <div className={`${className}`}>{link ? <Link to={link}>{button}</Link> : button}</div>
}

export default Button
