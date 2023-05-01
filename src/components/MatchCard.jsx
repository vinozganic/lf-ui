import { React, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MediumText from "./MediumText"
import { info } from "autoprefixer"

const MatchCard = ({ match, lostItem, handleShowProps, handleDiscard }) => {
    const [progressColor, setProgressColor] = useState("")
    const navigate = useNavigate()

    const redirectToDmPage = (id) => {
        navigate(`/dm/${id}`)
    }

    const toggleShowProps = () => {
        if (!match.discarded && lostItem) {
            handleShowProps(match.data.id)
        }
    }

    const chatSVG = (
        <svg className="svg-icon h-8 max-sm:h-6" viewBox="0 0 20 20">
            <path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
        </svg>
    )

    const trashCanSVG = (
        <svg className={`svg-icon h-8 max-sm:h-6`} viewBox="0 0 20 20">
            <path
                fill="white"
                d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
            <path
                fill={`${match.discarded ? "none" : "white"}`}
                d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
            <path
                fill={`${match.discarded ? "none" : "white"}`}
                d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
        </svg>
    )

    const infoSVG = (
        <svg className={`svg-icon h-8 max-sm:h-6`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="white"
                d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"></path>
            <path
                fill="white"
                d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"></path>
            <path
                fillRule="evenodd"
                fill="white"
                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"></path>
        </svg>
    )

    useEffect(() => {
        if (match.data.matchProbability * 100 > 80) setProgressColor("bg-green")
        else if (match.data.matchProbability * 100 > 50) setProgressColor("bg-yellow")
        else return setProgressColor("bg-red")
    })

    const CardButton = ({ iconSVG, onClickHandler, className }) => {
        return (
            <div
                className={`flex items-center justify-center text-center border-2
                font-bold p-3 rounded-full lg:hover:bg-opacity-50 cursor-pointer w-fit
                transition-all ease-in-out duration-150 ${className}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onClickHandler(match.data.id)
                }}>
                {iconSVG}
            </div>
        )
    }

    const ProgressBar = () => {
        return (
            <div className="w-full items-center justify-start flex h-8 p-1 rounded-2xl border-2 border-white/50 bg-white/20 border-opacity-50">
                <div
                    className={`h-full rounded-2xl ${progressColor} px-4 flex justify-center items-center text-background font-bold`}
                    style={{ width: `${match.data.matchProbability * 100}%` }}>
                    {Math.round(match.data.matchProbability * 100)}%
                </div>
            </div>
        )
    }

    return (
        <nav
            className={`max-sm:p-2 sm:p-6 lg:px-8 lg:py-6 items-center justify-center flex
            select-none border-2 border-gray lg:hover:border-primary rounded-lg w-full
            transition-all ease-in-out duration-150
            ${match.discarded ? `bg-gray/30` : "lg:hover:scale-105 lg:hover:bg-gray bg-gray/60"}
            ${match.showProps && "border-primary"}`}>
            <div className="grid w-full md:gap-y-10 sm:gap-y-7 max-sm:gap-y-5">
                <ProgressBar />
                <div
                    className={`relative ${
                        match.discarded ? "flex items-centers max-sm:gap-x-8 sm:gap-x-10" : "flex items-centers max-sm:gap-x-8 sm:gap-x-10"
                    }`}>
                    <CardButton
                        iconSVG={trashCanSVG}
                        onClickHandler={handleDiscard}
                        className={`ml-4 bg-white/20 border-white/50 ${match.discarded && "invisible"}`}
                    />
                    <CardButton
                        iconSVG={infoSVG}
                        onClickHandler={toggleShowProps}
                        className={`bg-white/20 border-white/50 ${match.discarded && "invisible"}`}
                    />
                    <CardButton
                        iconSVG={chatSVG}
                        onClickHandler={redirectToDmPage}
                        className={`mr-4 bg-primary border-black ${match.discarded && "invisible"}`}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <CardButton
                            iconSVG={trashCanSVG}
                            onClickHandler={handleDiscard}
                            className={`bg-primary ${!match.discarded && "hidden"}`}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MatchCard
