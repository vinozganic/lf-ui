import { React, useState, useRef, useEffect, useCallback } from "react"
import { StreamChat } from "stream-chat"
import "./MatchesListStyles.css"
import { useFetch } from "use-http"
import { API_URL } from "../constants"
import ChatBox from "./ChatBox"
import { MatchCard, SmallText, Button, ResolvedModal, PropsModal } from "../components"

const MatchesList = ({ matches, item, itemType, resolveItem }) => {
    const scrollContainer = useRef(null)

    const matchesList = matches
        .map((match) => ({ data: match, showProps: false }))
        .sort((a, b) => b.data.matchProbability - a.data.matchProbability)

    const [resolvedModalVisible, setResolvedModalVisible] = useState(false)
    const [currentMatch, setCurrentMatch] = useState(null)
    const [foundItems, setFoundItems] = useState([])
    const [itemToResolveWith, setItemToResolveWith] = useState(null)

    const { loading: foundLoading, error: foundError, request: foundRequest, response: foundResponse } = useFetch(`${API_URL}`)

    const [chatClient, setChatClient] = useState(null)

    useEffect(() => {
        if (!item) return
        const connectToChatClient = async () => {
            const chatClient = StreamChat.getInstance("smqmafukudwa")
            await chatClient.connectUser(
                {
                    name: "Korisnik",
                    id: item.id,
                },
                item.streamChatToken
            )
            setChatClient(chatClient)
        }
        connectToChatClient()
    }, [item])

    const scrollLeft = () => {
        scrollContainer.current.scrollLeft -= 180
    }

    const scrollRight = () => {
        scrollContainer.current.scrollLeft += 180
    }

    const handleResolvedChange = () => {
        setResolvedModalVisible(true)
        setItemToResolveWith(null)
    }

    const handleResolveWithCard = () => {
        setResolvedModalVisible(true)
        setItemToResolveWith({ foundId: currentMatch.data.foundId })
    }

    const handleShowProps = () => {
        setCurrentMatch({ data: currentMatch.data, itemData: currentMatch.itemData, showProps: !currentMatch.showProps })
    }

    const getItems = useCallback(async () => {
        const items = await foundRequest.post(
            `/lost/batch`,
            matchesList.map((match) => match.data.lostId)
        )
        if (foundResponse.ok) {
            setFoundItems(items)
        }
    }, [foundRequest, foundResponse])

    useEffect(() => {
        if (itemType === "found") {
            getItems()
        }
    }, [getItems])

    const ArrowRightSvg = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white">
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
        )
    }

    const ArrowLeftSvg = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white">
                <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
        )
    }

    const InfoSvg = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="#fff" opacity="60%" viewBox="0 0 1920 1920">
                <g fillRule="evenodd">
                    {'{" "}'}
                    <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-42.074 626.795c-85.075 39.632-157.432 107.975-229.844 207.898-10.327 14.249-10.744 22.907-.135 30.565 7.458 5.384 11.792 3.662 22.656-7.928 1.453-1.562 1.453-1.562 2.94-3.174 9.391-10.17 16.956-18.8 33.115-37.565 53.392-62.005 79.472-87.526 120.003-110.867 35.075-20.198 65.9 9.485 60.03 47.471-1.647 10.664-4.483 18.534-11.791 35.432-2.907 6.722-4.133 9.646-5.496 13.23-13.173 34.63-24.269 63.518-47.519 123.85l-1.112 2.886c-7.03 18.242-7.03 18.242-14.053 36.48-30.45 79.138-48.927 127.666-67.991 178.988l-1.118 3.008a10180.575 10180.575 0 0 0-10.189 27.469c-21.844 59.238-34.337 97.729-43.838 138.668-1.484 6.37-1.484 6.37-2.988 12.845-5.353 23.158-8.218 38.081-9.82 53.42-2.77 26.522-.543 48.24 7.792 66.493 9.432 20.655 29.697 35.43 52.819 38.786 38.518 5.592 75.683 5.194 107.515-2.048 17.914-4.073 35.638-9.405 53.03-15.942 50.352-18.932 98.861-48.472 145.846-87.52 41.11-34.26 80.008-76 120.788-127.872 3.555-4.492 3.555-4.492 7.098-8.976 12.318-15.707 18.352-25.908 20.605-36.683 2.45-11.698-7.439-23.554-15.343-19.587-3.907 1.96-7.993 6.018-14.22 13.872-4.454 5.715-6.875 8.77-9.298 11.514-9.671 10.95-19.883 22.157-30.947 33.998-18.241 19.513-36.775 38.608-63.656 65.789-13.69 13.844-30.908 25.947-49.42 35.046-29.63 14.559-56.358-3.792-53.148-36.635 2.118-21.681 7.37-44.096 15.224-65.767 17.156-47.367 31.183-85.659 62.216-170.048 13.459-36.6 19.27-52.41 26.528-72.201 21.518-58.652 38.696-105.868 55.04-151.425 20.19-56.275 31.596-98.224 36.877-141.543 3.987-32.673-5.103-63.922-25.834-85.405-22.986-23.816-55.68-34.787-96.399-34.305-45.053.535-97.607 15.256-145.963 37.783Zm308.381-388.422c-80.963-31.5-178.114 22.616-194.382 108.33-11.795 62.124 11.412 115.76 58.78 138.225 93.898 44.531 206.587-26.823 206.592-130.826.005-57.855-24.705-97.718-70.99-115.729Z" />
                    {'{" "}'}
                </g>
            </svg>
        )
    }
    const sortedListMatchCards = matchesList.map((match, index) => (
        <div key={index} className={`w-full snap-start`}>
            <MatchCard
                className={`${currentMatch?.data.id === match.data.id ? "border-primary" : ""} h-full`}
                match={match}
                itemData={itemType === "lost" ? null : foundItems?.data?.find((item) => item._id === match.data.lostId)}
                setCurrentMatch={setCurrentMatch}
            />
        </div>
    ))

    return (
        <>
            {!foundLoading && (
                <div className="flex items-start justify-center">
                    <div className="w-full my-2 lg:mt-6 lg:mx-10 lg:w-4/5 2xl:w-[80rem]">
                        {matchesList.length === 0 && (
                            <div>
                                <SmallText>Trenutno nema potencijalnih spojeva</SmallText>
                            </div>
                        )}
                        {matchesList.length > 0 && (
                            <>
                                {itemType === "lost" && (
                                    <div className="flex items-center justify-start">
                                        <Button
                                            className="mb-2 sm:mb-5 w-full sm:w-2/3 md:w-1/2 xl:w-2/5 2xl:w-1/3"
                                            buttonClassName="drop-shadow-none"
                                            onClick={handleResolvedChange}>
                                            <SmallText className="text-[1rem]">Predmet je pronađen izvan aplikacije</SmallText>
                                        </Button>
                                        {resolvedModalVisible && (
                                            <ResolvedModal
                                                setVisible={setResolvedModalVisible}
                                                resolveItem={resolveItem}
                                                body={itemToResolveWith}
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="mx-1 mt-6 flex flex-row w-full border-2 rounded-xl border-[rgb(255,255,255)] border-opacity-10 shadow-[rgb(255,255,255)]">
                                    <div
                                        className="bg-primary hover:bg-primary/60 min-w-[2rem] lg:min-w-[2.5rem] max-w-[3rem] grow rounded-l-xl flex justify-center items-center cursor-pointer"
                                        onClick={scrollLeft}>
                                        <ArrowLeftSvg />
                                    </div>
                                    <div
                                        className="px-4 grid grow grid-flow-col scrollbar-hide border-y-2 border-[rgb(255,255,255)] border-opacity-10 shadow-[rgb(255,255,255)] scroll-p-4 sm:scroll-p-6 snap-type-inline-mandatory overscroll-x-contain auto-cols-[60%] xl:auto-cols-[26%] lg:auto-cols-[30%] py-2 md:auto-cols-[31%] sm:auto-cols-[40%] overflow-x-auto gap-6 touch-pan-x scroll-smooth will-change-scroll"
                                        ref={scrollContainer}>
                                        {sortedListMatchCards}
                                    </div>
                                    <div
                                        className="bg-primary max-w-[3rem] hover:bg-primary/60 min-w-[2rem] lg:min-w-[2.5rem] grow rounded-r-xl flex justify-center items-center cursor-pointer"
                                        onClick={scrollRight}>
                                        <ArrowRightSvg />
                                    </div>
                                </div>
                                <div className="sm:pb-5 pb-2 sm:px-14 mt-2 flex justify-start items-center gap-2">
                                    <div>
                                        <InfoSvg />
                                    </div>
                                    <SmallText className="text-sm font-semibold text-white/60">
                                        Imena na karticama služe samo za razlikovanje spojeva. Ne predstavljaju stvarna imena korisnika.
                                    </SmallText>
                                </div>
                                {currentMatch && (
                                    <div className="mt-4 bg-gray/40 px-2 pt-2 pb-4 rounded-3xl">
                                        <div className="p-1 h-[26rem] lg:h-[30rem] mb-6 ">
                                            <ChatBox
                                                channelId={currentMatch.data.id}
                                                channelName={currentMatch.data.nickname}
                                                chatClient={chatClient}
                                            />
                                        </div>
                                        <div className="flex justify-start align-middle gap-4">
                                            {itemType === "found" && (
                                                <>
                                                    <Button onClick={handleShowProps} className="w-full sm:w-2/3 lg:w-1/3">
                                                        <SmallText className="text-[1rem]">Prikaži detalje</SmallText>
                                                    </Button>
                                                    <PropsModal currentMatch={currentMatch} handleShowProps={handleShowProps} />
                                                </>
                                            )}
                                            {itemType === "lost" && (
                                                <Button
                                                    className="w-full sm:w-2/3 md:w-1/2 xl:w-2/5 2xl:w-1/3"
                                                    onClick={handleResolveWithCard}>
                                                    <SmallText className="text-[1rem]">Slučaj je riješen pomoću ovog spoja</SmallText>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default MatchesList
