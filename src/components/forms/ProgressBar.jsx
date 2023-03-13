import React from "react"

const ProgressBar = ({ progress, className }) => {
    return (
        <div className={`flex gap-2 ${className}`}>
            <div className="bg-gray w-full flex justify-center rounded-full">
                <div className="w-full flex">
                    <div
                        style={{ width: `${progress}%` }}
                        className={`transition-width ease rounded-full p-4 bg-white bg-gradient-to-r from-primaryLowOpacity to-primary background-animate drop-shadow-lg`}></div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
