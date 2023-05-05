import { useEffect, useState } from "react"
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import "./ChatStyles.css"
import "stream-chat-react/dist/css/v2/index.css"

const ChatBox = ({ channelId, channelName, chatClient }) => {
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        const connectToChat = async () => {
            const channel = await chatClient.channel("messaging", channelId, {
                name: channelName,
            })
            setChannel(channel)
        }

        connectToChat()
    }, [channelId, chatClient])

    if (!chatClient || !channel) return null

    return (
        <Chat client={chatClient} theme="messaging">
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader title={channelName} />
                    <MessageList disableDateSeparator={true} />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

export default ChatBox
