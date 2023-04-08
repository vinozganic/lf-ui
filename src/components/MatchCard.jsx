import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MediumText from './MediumText'

const MatchCard = ({ match, lostItem, handleShowProps, handleDiscard }) => {
    const navigate = useNavigate()

    const redirectToSite = (id) => {
        navigate(`/dm/${id}`)
    }

    const toggleShowProps = () => {
        if (!match.discarded) {
            handleShowProps(match.data.id)
        } 
    }

    const ChatSVG = (
        <svg className="svg-icon h-5 max-sm:h-5" viewBox="0 0 20 20">
		    <path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
        </svg>
    )

    const TrashCanSVG = (
        <svg className={`svg-icon h-5 max-sm:h-4`} viewBox="0 0 20 20">
		    <path fill="black" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
			<path fill={`${match.discarded ? "none" : "black"}`} d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
			<path fill={`${match.discarded ? "none" : "black"}`} d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
		</svg>
    )

    const ArrowSVG = (
        <svg className={`transform transition-all duration-200 ${match.showProps ? "rotate-180" : "rotate-0"} h-[2rem]`} viewBox="0 0 20 20">
            <path fill={`${match.discarded ? "rgba(255, 255, 255, 0.5)" : "white"}`} d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
		</svg>
    )

    const CardButton = ({text, iconSVG, onClikHandler, className}) => (
        <div className={`flex items-center justify-center text-center border-2 border-black 
            font-bold px-6 py-2 gap-x-2 rounded-3xl lg:hover:bg-opacity-50 cursor-pointer 
            transition-all ease-in-out duration-150 ${className}`}
            onClick={(e) => { e.stopPropagation(); onClikHandler(match.data.id) }}>
            <MediumText className="max-sm:text-base text-xl font-bold text-black">
                {text}
            </MediumText>
            {iconSVG}
        </div>
    )

    return (
        <nav className={`max-sm:p-4 sm:p-6 lg:px-8 lg:py-6 items-center justify-center flex
            select-none border-2 border-gray lg:hover:border-primary rounded-lg
            transition-all ease-in-out duration-150 gap-x-10
            ${match.discarded ? `bg-gray/30` : "cursor-pointer lg:hover:scale-105 lg:hover:bg-gray bg-gray/60" }
            ${match.showProps && "border-primary"}`}
            onClick={toggleShowProps}>
            <div className="grid md:gap-y-10 sm:gap-y-7 max-sm:gap-y-5">
                <MediumText className={`text-center max-sm:text-2xl w-full
                    ${match.discarded ? "text-white/40" : "text-white"}`}>
                    {`Vjerojatnost: ${match.data.match_probability}`}
                </MediumText>
                <div className={`${match.discarded ? "justify-center items-center flex" : 
                    "max-sm:flex sm:grid sm:grid-cols-2 max-sm:gap-x-2 sm:gap-x-5"}`}>
                    <CardButton 
                        text="Chat" 
                        iconSVG={ChatSVG} 
                        onClikHandler={redirectToSite} 
                        className={`bg-primary ${match.discarded && "hidden"}`}
                    />
                    <CardButton
                        text="Ukloni" 
                        iconSVG={TrashCanSVG}
                        onClikHandler={handleDiscard}
                        className={`bg-white lg:hover:bg-white/50 ${match.discarded && "hidden"}`}
                    />
                    <CardButton
                        text="Vrati" 
                        iconSVG={TrashCanSVG}
                        onClikHandler={handleDiscard} 
                        className={`bg-primary ${!match.discarded && "hidden"}`}
                    />
                </div>
            </div>
        </nav>
    )
}

export default MatchCard