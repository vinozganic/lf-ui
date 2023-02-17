import React from "react"

const Button = ({ children, onClick, className }) => {
    return (
        <div className={`${className}`}>
            <button
                onClick={onClick}
                type="button"
                className="text-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100
                                font-bold px-8 py-2 border-solid border-black w-full 
                                border-opacity-30 border-2 border-b-4 bg-gradient-to-tr from-primary to-pink rounded-3xl
                                hover:from-secondary hover:to-pink text-black
                                shadow-primary shadow-2xl hover:shadow-secondary text-opacity-60
                                active:ring-primary active:ring-1
                                active:from-secondary active:to-primary active:shadow-sm">
                {children}
            </button>
        </div>
    )
}

export default Button
