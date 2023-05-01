import { React, useEffect } from "react"

const Modal = ({ onClose, displayMatch, children }) => {
    const displayString = Object.keys(displayMatch).map((key, index) => (
        <li key={index}>
            {key}: {displayMatch[key]}
        </li>
    ))

    useEffect(() => {
        if (displayString.length !== 0 && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [displayString])

    return (
        displayString.length !== 0 && (
            <nav className="mx-2 max-lg:fixed max-lg:inset-0 max-lg:justify-center max-lg:items-center max-lg:flex max-h-screen  lg:flex-1">
                <div
                    className={`lg:hidden fixed z-40 inset-0 min-w-screen min-h-screen
                    bg-black backdrop-blur-sm bg-opacity-25`}
                    onClick={() => onClose()}></div>

                <div
                    className="z-40 h-2/3 max-h-fit bg-gray flex flex-col justify-evenly items-center rounded-xl 
                    lg:p-5 lg:sticky lg:top-[8.5rem] lg:ml-16
                    max-sm:p-5 sm:p-10 max-lg:m-10 xs:w-full w-full lg:w-2/3">
                    <div className="w-full flex justify-between">
                        <span className="overflow-clip">
                            <ul className="lg:p-10 max-lg:p-5 text-white font-bold lg:text-2xl sm:text-xl max-sm:text-base">
                                {displayString}
                            </ul>
                        </span>
                        <span className="cursor-pointer h-fit w-fit" onClick={() => onClose()}>
                            <svg viewBox="0 0 20 20" className="svg-icon h-[2rem] w-[2rem]">
                                <path
                                    fill="white"
                                    d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
				                c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
				                l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
				                C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
				                s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
				                c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="w-full h-fit">{children}</div>
                </div>
            </nav>
        )
    )
}

export default Modal
