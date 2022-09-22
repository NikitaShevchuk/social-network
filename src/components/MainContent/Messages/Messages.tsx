import React, {FC, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import Preloader from "../../../common/Preloader/Preloader";
import {MessagesPropsType} from "./MessagesContainer";
import Dialogs from "./Dialogs/Dialogs";
import NewMessage from "./NewMessage";
import ConversationHead from "./ConversationHead";

const Messages: FC<MessagesPropsType> = ({
    messages, setAllMessages, setDialogs, dialogs, sendNewMessage
}) => {
    //let ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    // todo add web socket chat (in external service file)
    // ws.addEventListener('message', (e) => {
    //     console.log(e)
    // })
    const userId = Number(useParams().userId);
    const element = useRef<HTMLUListElement>(null);
    const scrollToBottom = () => element.current
        ? element.current.scrollTop = element.current.scrollHeight
        : null
    const loadMessages = () => setAllMessages(userId)
    const sendMessage = (formData: any) => {
        sendNewMessage(userId, formData)
    }
    useEffect(() => {
        setDialogs(userId)
        const requireMessagesInterval = setInterval( loadMessages, 300 )
        if (userId) loadMessages()
        else clearInterval(requireMessagesInterval)
        return () => clearInterval(requireMessagesInterval)
    }, [userId])
    useEffect(() => {
        if (element.current && messages[0]) scrollToBottom()
    }, [messages])
    return <div className="central-meta messages">
        <div className="messages">
            <div className="message-box">
                <Dialogs />
                <div className="peoples-mesg-box">
                    {userId ?
                        <div className='chatArea opacity-animation'>
                            <ConversationHead />
                            <ul
                                className="chatting-area ps-container ps-theme-default ps-active-y"
                                ref={element}
                            >
                                {messages[0] ? messages : <Preloader/>}
                            </ul>
                            <NewMessage sendMessage={sendMessage}/>
                        </div>
                        :
                        <div className='noMessages'>Choose friend to start chat</div>}
                </div>
            </div>
        </div>
    </div>
}

export default Messages