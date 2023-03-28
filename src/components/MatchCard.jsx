import { React, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MediumText from './MediumText'

const MatchCard = ({ probability, matchId, lostItem, functionPassID, showProps, handleShowProps, discarded, handleDiscard, lockScrollModal }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isBlured, setIsBlured] = useState(false)
    const ref = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    })

    const redirectToSite = (matchId) => {
        navigate(`/dm/${matchId}`)
    }

    return (
        <div className="transform lg:scale-100 md:scale-100 scale-90 ">
            <div ref={ref} className={`relative py-6 pl-6 md:pl-8 lg:pl-6 max-md:pr-6 md:pr-8 lg:pr-0 items-center justify-center flex select-none bg-gray/60 border-2 
                border-gray/60 rounded-lg transition ease-in-out duration-150 gap-x-10 w-full h-fit
                ${discarded ? `bg-gray/20 lg:hover:bg-gray/60` : "cursor-pointer lg:hover:scale-105 lg:hover:bg-gray" }
                ${isBlured ? "blur-md border-primary/50" : "lg:hover:border-primary" }
                ${showProps ? "border-primary" : "" }`}
                onClick={() => {if (!discarded) {handleShowProps(functionPassID); lockScrollModal()} } }>
                <div className={`w-full grid gap-y-10`}>
                    <MediumText className={`${(screenWidth < 500) ? "text-2xl" : ""} max-lg:text-center ${discarded ? "text-white/40" : "text-white"}`}>{`Vjerojatnost: ${probability}`}</MediumText>
                    <div className="flex lg:justify-start gap-x-5 max-lg:justify-center">
                        <div className={`${(discarded && screenWidth < 1024) ? "hidden" : ""} flex gap-2 text-center font-bold px-6 py-2 w-fit items-center justify-center
                            rounded-3xl hover:bg-opacity-80 ${discarded ? "bg-primary/50" : "cursor-pointer bg-primary"}`}
                            onClick={(e) => { e.stopPropagation(); redirectToSite(matchId) }}>
                            <div className={`${screenWidth < 500 ? "text-[16px]" : "text-xl"} font-bold text-black`}>Chat</div>
                            <svg className={`svg-icon ${screenWidth < 500 ? "h-[22px]" : "h-[26px]"}`} viewBox="0 0 20 20">
							    <path d="M17.659,3.681H8.468c-0.211,0-0.383,0.172-0.383,0.383v2.681H2.341c-0.21,0-0.383,0.172-0.383,0.383v6.126c0,0.211,0.172,0.383,0.383,0.383h1.532v2.298c0,0.566,0.554,0.368,0.653,0.27l2.569-2.567h4.437c0.21,0,0.383-0.172,0.383-0.383v-2.681h1.013l2.546,2.567c0.242,0.249,0.652,0.065,0.652-0.27v-2.298h1.533c0.211,0,0.383-0.172,0.383-0.382V4.063C18.042,3.853,17.87,3.681,17.659,3.681 M11.148,12.87H6.937c-0.102,0-0.199,0.04-0.27,0.113l-2.028,2.025v-1.756c0-0.211-0.172-0.383-0.383-0.383H2.724V7.51h5.361v2.68c0,0.21,0.172,0.382,0.383,0.382h2.68V12.87z M17.276,9.807h-1.533c-0.211,0-0.383,0.172-0.383,0.383v1.755L13.356,9.92c-0.07-0.073-0.169-0.113-0.27-0.113H8.851v-5.36h8.425V9.807z"></path>
						    </svg>
                        </div>
                        <div className={`${(discarded && screenWidth < 1024) ? "hidden" : ""} flex gap-2 text-center font-bold px-6 py-2 w-fit items-center justify-center
                            rounded-3xl hover:bg-opacity-80 ${discarded ? "bg-primary/50" : "cursor-pointer bg-primary "}`}
                            onClick={(e) => { e.stopPropagation(); handleDiscard(functionPassID); }}>
                            <div className={`${screenWidth < 500 ? "text-[16px]" : "text-xl"} font-bold text-black`}>Discard</div>
                            <svg className={`svg-icon ${screenWidth < 500 ? "h-[16px]" : "h-[20px]"}`} viewBox="0 0 20 20">
							    <path fill="black" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
							    <path fill="black" d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
							    <path fill="black" d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
						    </svg>
                        </div>
                        <div className={`${(discarded && screenWidth < 1024) ? "visible" : "hidden"} flex gap-2 text-center font-bold px-6 py-2 w-fit 
                            items-center justify-center rounded-3xl hover:bg-opacity-80 bg-primary`}
                            onClick={(e) => { e.stopPropagation(); handleDiscard(functionPassID); }}>
                            <div className="text-xl font-bold text-black">Undo</div>
                            <svg className="svg-icon h-[20px]" viewBox="0 0 20 20">
							    <path fill="black" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
						    </svg>
                        </div>
                    </div>
                </div>
            
                {lostItem && 
                    <div className="w-fit items-center mr-4 max-lg:hidden" >
                        <svg className={`${showProps ? "rotate-180" : "rotate-0"} w-[2rem] h-[2rem]`} viewBox="0 0 20 20">
                            <path fill={`${discarded ? "rgba(255, 255, 255, 0.5)" : "white"}`} d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
				        </svg>
                    </div>
                }
            
            </div>
            {discarded &&
                <div className={`max-lg:hidden absolute z-10 opacity-0 hover:opacity-100 h-[168px] w-[434px] max-md:hidden
                    translate-y-[-168px] rounded-lg flex justify-center items-center`}
                    onMouseEnter={() => setIsBlured(true)}
                    onMouseLeave={() => setIsBlured(false)}>
                    <div className="flex grid-flow-row justify-center items-center gap-x-2 w-fit h-fit cursor-pointer bg-primary/70 border-2 border-black rounded-3xl px-6 py-2 hover:bg-primary/60"
                        onClick={(e) => { e.stopPropagation(); handleDiscard(functionPassID); setIsBlured(false) }}>
                        <MediumText className="text-black">Undo</MediumText>
                        <svg className="svg-icon h-[20px]" viewBox="0 0 20 20">
                            <path fill="black" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
                        </svg>
                    </div>
                </div>
            }
        </div>
    )
}

export default MatchCard