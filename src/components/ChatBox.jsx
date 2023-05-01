import { useEffect, useState } from "react"
import { StreamChat } from "stream-chat"
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import "./ChatStyles.css"
import "stream-chat-react/dist/css/v2/index.css"

const ChatBox = ({ matchId, chatClient }) => {
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        const connectToChat = async () => {
            const channel = await chatClient.channel("messaging", matchId, {
                name: matchId,
            })

            setChannel(channel)
            console.log(channel)
        }

        connectToChat()
    }, [matchId, chatClient])

    if (!chatClient || !channel) return null

    return (
        <div className="p-3 h-1/2">
            <Chat client={chatClient} theme="messaging">
                <Channel channel={channel}>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    )
}

export default ChatBox
