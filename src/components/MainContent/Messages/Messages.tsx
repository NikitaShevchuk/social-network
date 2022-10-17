import React, {FC, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import Preloader from "../../../preloaders/Preloader";
import {MessagesPropsType} from "./MessagesContainer";
import Dialogs from "./Dialogs/Dialogs";
import NewMessage from "./NewMessage";
import ConversationHead from "./ConversationHead";
import {isElementScrolledToBottom} from "../../../common/helpers/isElementScrolledToBottom";

const Messages: FC<MessagesPropsType> = ({
    messages, setAllMessages, sendNewMessage
}) => {
    const userId = Number(useParams().userId);
    const messagesContainer = useRef<HTMLUListElement>(null);
    const scrollToBottom = () => {
        if (messagesContainer.current) {
            messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
        }
    }
    const loadMessages = () => setAllMessages(userId)
    const sendMessage = (formData: any) => {
        sendNewMessage(userId, formData)
    }
    useEffect(() => {
        const requireMessagesInterval = setInterval( loadMessages, 5000 )
        if (userId) loadMessages()
        else clearInterval(requireMessagesInterval)
        return () => clearInterval(requireMessagesInterval)
    }, [userId])
    useEffect(() => {
        const isScrolledToBottom = isElementScrolledToBottom(messagesContainer.current)
        if (isScrolledToBottom && messages[0]) scrollToBottom()
    }, [messages])
    useEffect(() => scrollToBottom(), [])
    return <div className="central-meta messages">
        <div className="messages">
            <div className="message-box">
                <Dialogs />
                <div className="peoples-mesg-box">
                    {userId &&
                        <div className='chatArea opacity-animation'>
                            <ConversationHead/>
                            <ul
                                className="chatting-area ps-container ps-theme-default ps-active-y"
                                ref={messagesContainer}
                            >
                                {messages[0] ? messages : <Preloader/>}
                            </ul>
                            <NewMessage sendMessage={sendMessage}/>
                        </div>
                    }
                    {!userId &&
                        <div className='fetch-error'>Choose friend to start chat</div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Messages