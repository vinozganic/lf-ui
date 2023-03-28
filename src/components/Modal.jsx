import React from 'react'

const Modal = ({ isVisible, onClose, children, displayMatch }) => {
    
    return (
        isVisible &&
            <nav className="xl:top-[150px] lg:top-[136px] lg:z-50 lg:sticky lg:gap-y-40 lg:flex lg:h-fit lg:w-full">
                <div className="max-lg:hidden ml-16 w-full bg-gray/60 p-10 rounded-xl flex grid-cols-2 gap-x-14">
                    <span className= "w-full text-white font-bold lg:text-xl xl:text-2xl">
                        {displayMatch}
                        {children}
                    </span>
                    <span className="cursor-pointer z-50" onClick={() => onClose()}>
                        <svg viewBox="0 0 20 20" className="svg-icon h-[2rem] w-[2rem]">
							<path fill="white" d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
								c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
								l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
								C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
								s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
								c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
						</svg>
                    </span>
                </div>
                <div className="lg:hidden fixed inset-0 z-50 w-screen h-screen overflow-clip bg-black bg-opacity-25 backdrop-blur-sm
                    flex justify-center items-center" onClick={() => onClose()}>
                    <div className="w-full bg-gray flex mx-20 justify-between" onClick={(e) => e.stopPropagation()}>
                        <div className="p-10 rounded-xl text-black font-bold text-3xl">
                            {displayMatch}
                            {children}
                        </div>
                        <span className="cursor-pointer h-fit w-fit p-4">
                            <svg viewBox="0 0 20 20" className="svg-icon h-[2rem] w-[2rem]" onClick={() => onClose()}>
							    <path fill="white" d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
								    c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
								    l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
								    C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
								    s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
								    c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
						    </svg>
                        </span>
                    </div>
                </div>
            </nav>
    )
}

export default Modal