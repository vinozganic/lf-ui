import React from "react"

const Button = ({ children, onClick, className }) => {
    return (
        <div className={`${className}`}>
            <button
                onClick={onClick}
                type="button"
                className="text-center font-bold px-8 py-3 border-solid border-black 
                            border-opacity-30 border-2 border-b-4 bg-gradient-to-tr from-primary to-pink rounded-2xl
                             hover:bg-gradient-to-tr hover:from-secondary hover:to-pink
                            shadow-primary shadow-2xl hover:shadow-secondary text-black text-opacity-60
                             active:px-8 active:py-3 active:ring-primary active:ring-1
                             active:bg-gradient-to-tr active:from-secondary active:to-primary">
                {children}
            </button>
        </div>
    )
}

export default Button
