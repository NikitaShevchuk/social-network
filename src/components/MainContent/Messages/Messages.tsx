import React, {FC, useRef} from "react";
import {useParams} from "react-router-dom";
import Preloader from "../../../preloaders/Preloader";
import {MessagesPropsType} from "./MessagesContainer";
import NewMessage from "./NewMessage";
import ConversationHead from "./ConversationHead";
import {useFetchMessages, useScrollChat} from "./hooks";
import {NewMessageFormData} from "../../../types/MessagesTypes";
import arrow from '../../../common/assets/img/icons/down-arrow.png'


const Messages: FC<MessagesPropsType> = ({
    messages, sendNewMessage, status, loadMoreMessages
}) => {
    const userId = Number(useParams().userId);
    const sendMessage = (formData: NewMessageFormData) => sendNewMessage(formData)
    const chatRef = useRef<HTMLUListElement | null>(null)
    const scrolledOnChatLoad = useRef<boolean>(false)

    useFetchMessages(messages, chatRef, scrolledOnChatLoad, status)
    const {
        handleScrollClick, handleScroll, showScrollButton
    } = useScrollChat(loadMoreMessages,chatRef, scrolledOnChatLoad)
    return (
        <div className="peoples-mesg-box">
            {userId &&
                <div className='chatArea opacity-animation'>
                    <ConversationHead/>
                    <ul
                        className="chatting-area"
                        ref={chatRef}
                        onScroll={handleScroll}
                    >
                        <Preloader
                            isFetching={status.isFetching}
                            size='small'
                        />
                        {status.isLoading && <Preloader />}
                        {messages[0]
                            ? !status.isLoading && messages
                            : !status.isLoading && (
                                <div className='preloader'>
                                    You've got no messages yet.
                                </div>
                              )
                        }
                    </ul>
                    {showScrollButton &&
                        <img
                            src={arrow} alt=""
                            className="scroll-bottom opacity-animation"
                            onClick={handleScrollClick}
                        />
                    }
                    <NewMessage sendMessage={sendMessage}/>
                </div>
            }
            {!userId &&
                <div className='fetch-error'>Choose friend to start chat</div>
            }
        </div>
    )
}

export default Messages