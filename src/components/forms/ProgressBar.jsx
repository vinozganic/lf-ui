import React from "react"

const ProgressBar = ({ progress }) => {
    return (
        <div className="flex fixed z-20 top-12 p-12 pb-24 w-full max-w-7xl bg-gradient-to-b from-background via-background to-transparent duration-300 ease-in-out pointer-events-none">
            <div className="bg-gray w-full flex justify-center rounded-full pointer-events-auto">
                <div className="w-full flex">
                    <div
                        style={{ width: `${progress}%` }}
                        className="transition-width ease rounded-full p-4 bg-white bg-gradient-to-r from-primary via-primary to-white background-animate shadow-lg"></div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
