import { React, useState, useRef, useEffect, useCallback } from "react"
import { StreamChat } from "stream-chat"
import "./MatchesListStyles.css"
import { useFetch } from "use-http"
import { API_URL } from "../constants"
import ChatBox from "./ChatBox"
import { MatchCard, SmallText, Button, ResolvedModal, PropsModal, SvgList } from "../components"

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
    const sortedListMatchCards = matchesList.map((match, index) => (
        <div key={index} className={`w-full snap-start`}>
            <MatchCard
                className={`${currentMatch?.data.id === match.data.id ? "border-primary" : ""} h-full`}
                match={match}
                itemData={itemType === "lost" ? null : foundItems?.data?.find((item) => item._id === match.data.lostId)}
                setCurrentMatch={setCurrentMatch}
                currentMatch={currentMatch}
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
                                <div className="sm:pb-5 pb-2 mt-2 flex justify-start items-center gap-2">
                                    <div>
                                        {SvgList["info"]}
                                    </div>
                                    <SmallText className="text-sm font-semibold text-white/60">
                                        {itemType ==="lost" && (
                                            <div>
                                                Ove kartice predstavljaju potencijalne spojeve s izgubljenim predmetima.
                                            </div>
                                        )}
                                        {itemType ==="found" && (
                                            <div>
                                                Ove kartice predstavljaju potencijalne spojeve s vlasnicima predmeta.
                                            </div>
                                        )}
                                            Imena na karticama ne predstavljaju stvarna imena korisnika, već služe za razlikovanje kartica.
                                    </SmallText>
                                </div>
                                <div className="mx-1 mt-3 flex flex-row w-full border-2 rounded-xl border-[rgb(255,255,255)] border-opacity-10 shadow-[rgb(255,255,255)]">
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
