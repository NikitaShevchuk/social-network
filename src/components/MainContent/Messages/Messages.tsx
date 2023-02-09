import React, { FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Preloader from '../../../preloaders/Preloader';
import { MessagesPropsType } from './MessagesContainer';
import NewMessage from './NewMessage';
import ConversationHead from './ConversationHead';
import { useFetchMessages, useScrollChat } from './hooks';
import { NewMessageFormData } from '../../../types/MessagesTypes';
import arrow from '../../../common/assets/img/icons/down-arrow.png';

const Messages: FC<MessagesPropsType> = ({
    messages,
    sendNewMessage,
    status,
    loadMoreMessages
}) => {
    const userId = Number(useParams().userId);
    const sendMessage = (formData: NewMessageFormData) => sendNewMessage(formData);
    const [chatRef, setChatRef] = useState<HTMLElement | null>(null);
    const scrolledOnChatLoad = useRef<boolean>(false);
    useFetchMessages(messages, chatRef, scrolledOnChatLoad, status);
    const { handleScrollClick, handleScroll, showScrollButton } = useScrollChat(
        loadMoreMessages,
        chatRef,
        scrolledOnChatLoad
    );
    const getChatRef = (chatRef: HTMLElement) => setChatRef(chatRef);
    return (
        <div className="peoples-mesg-box">
            {!!userId && (
                <div className="chatArea opacity-animation">
                    <ConversationHead />
                    <PerfectScrollbar
                        className="chatting-area"
                        component="ul"
                        containerRef={getChatRef}
                        onScroll={handleScroll}
                    >
                        <Preloader isFetching={status.isFetching} size="small" />
                        {status.isLoading && <Preloader />}
                        {messages[0]
                            ? !status.isLoading && messages
                            : !status.isLoading && (
                                  <div className="preloader">You've got no messages yet.</div>
                              )}
                    </PerfectScrollbar>
                    {showScrollButton && (
                        <img
                            src={arrow}
                            alt=""
                            className="scroll-bottom opacity-animation"
                            onClick={handleScrollClick}
                        />
                    )}
                    <NewMessage sendMessage={sendMessage} />
                </div>
            )}
            {!userId && <div className="fetch-error">Choose friend to start chat</div>}
        </div>
    );
};

export default Messages;
