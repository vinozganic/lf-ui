import { React, useEffect, useState } from "react"
import { StreamChat } from "stream-chat"
import MatchCard from "./MatchCard"
import Modal from "./Modal"
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

    const handleShowProps = (index) => {
        const newSelectMatches = matchesList.map((match) => {
            if (index === match.data.id) {
                return { ...match, showProps: !match.showProps }
            }
            return { ...match, showProps: false }
        })
        setMatchesList(newSelectMatches)
    }

    const handleCloseModal = () => {
        const newMatches = matchesList.map((match) => {
            return { ...match, showProps: false }
        })
        setMatchesList(newMatches)
    }

    const handleDiscard = (index) => {
        const newDiscardedMathces = matchesList
            .map((match) => {
                if (index === match.data.id) {
                    if (match.discarded) {
                        return { ...match, discarded: !match.discarded }
                    }
                    return { ...match, showProps: false, discarded: !match.discarded }
                }
                return { ...match }
            })
            .sort((a, b) => {
                if (a.discarded && !b.discarded) {
                    return 1
                } else if (!a.discarded && b.discarded) {
                    return -1
                } else {
                    return b.data.matchProbability - a.data.matchProbability
                }
            })
        setMatchesList(newDiscardedMathces)
    }

    const sortedListMatchCards = matchesList.map((match, index) => (
        <li key={index} className="w-full">
            <MatchCard match={match} lostItem={lostItem} handleShowProps={handleShowProps} handleDiscard={handleDiscard} />
        </li>
    ))

    if (!chatClient) return null

    return (
        <div className="flex my-10 lg:mx-10 xl:mx-40 max-lg:justify-center">
            <ul className="grid sm:gap-y-20 gap-y-10">{sortedListMatchCards}</ul>
            <Modal onClose={handleCloseModal} displayMatch={matchesList.find((match) => match.showProps === true)?.data || {}}>
                <Chat matchId={matchesList.find((match) => match.showProps === true)?.data.id || {}} chatClient={chatClient} />
            </Modal>
        </div>
    )
}

export default MatchesList
