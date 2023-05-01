import { React, useEffect, useState, useRef, useEffect, useCallback } from "react"
import { StreamChat } from "stream-chat"
import MatchCard from "./MatchCard"
import SmallText from "./SmallText"
import Button from "./Button"
import ResolvedModal from "./ResolvedModal"
import "./MatchesListStyles.css"
import { useFetch } from "use-http"
import { API_URL } from "../constants"
import PropsModal from "./PropsModal"
import Chat from "./ChatBox"

const MatchesList = ({ matches, lostItem, item }) => {
    const [matchesList, setMatchesList] = useState([])
    const [chatClient, setChatClient] = useState(null)

    useEffect(() => {
        const connectToChatClient = async () => {
            const chatClient = StreamChat.getInstance("smqmafukudwa")
            await chatClient.connectUser(
                {
                    name: item.streamChatToken,
                    id: item.id,
                },
                item.streamChatToken
            )
            setChatClient(chatClient)
        }
        connectToChatClient()
    }, [item])

    useEffect(() => {
        setMatchesList(
            matches
                .map((match) => ({ data: match, showProps: false, discarded: false }))
                .sort((a, b) => b.data.matchProbability - a.data.matchProbability)
        )
    }, [matches])

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
            matches.map((match) => match.lostId)
        )
        if (foundResponse.ok) {
            setFoundItems(items)
        }
    }, [foundRequest, foundResponse])

    useEffect(() => {
        if (lostItem) {
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
                className={`${currentMatch?.data.id === match.data.id ? "border-primary" : ""}`}
                match={match}
                itemData={!lostItem ? null : foundItems?.data?.find((item) => item._id === match.data.lostId)}
                setCurrentMatch={setCurrentMatch}
            />
        </div>
    ))

    if (!chatClient) return null

    return (
        <div className="flex my-10 lg:mx-10 xl:mx-40 max-lg:justify-center">
            <ul className="  grid sm:gap-y-20 gap-y-10">{sortedListMatchCards}</ul>
            <Modal onClose={handleCloseModal} displayMatch={matchesList.find((match) => match.showProps === true)?.data || {}} />
        </div>
    )
}

export default MatchesList
