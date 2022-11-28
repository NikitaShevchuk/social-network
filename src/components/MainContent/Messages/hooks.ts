import {useCallback, useEffect, useRef, useState} from "react";
import debounce from 'lodash.debounce'
import {MessagesRequestStatus} from "../../../types/MessagesTypes";

const isElementScrolledUp = (chatRef: HTMLElement | null): boolean => {
    if (!chatRef) return false
    const availableScrollHeight = chatRef.scrollHeight - chatRef.offsetHeight - 32
    return (chatRef.scrollTop + 70) < availableScrollHeight
}
const scrollChatToBottom = (chatRef: HTMLElement | null) => {
    if (!chatRef) return
    const scrolledUp = isElementScrolledUp(chatRef)
    if (!scrolledUp) chatRef.scrollTop = chatRef.scrollHeight
}

export const useFetchMessages = (
    messages: JSX.Element[],
    chatRef: HTMLElement | null ,
    scrolledOnChatLoad: { current: boolean },
    status: MessagesRequestStatus
) => {

    useEffect(() => {
        scrollChatToBottom(chatRef)
    }, [messages])

    useEffect(() => {
        if (!status.isLoading && !scrolledOnChatLoad.current) {
            if (chatRef) chatRef.scrollTop = chatRef.scrollHeight
            scrolledOnChatLoad.current = true
        }
    }, [status.isLoading])

    useEffect(
        () => {
            const needToScroll = !status.isFetching && !status.allMessagesIsLoaded
            if (chatRef && needToScroll) chatRef.scrollTop = 1100
        }, [status.isFetching]
    )

}

export const useScrollChat = (
    loadMoreMessages: () => void,
    chatRef: HTMLElement | null,
    scrolledOnChatLoad: { current: boolean },
) => {

    const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
    const messagesLoadWithDebounce = useCallback(debounce(loadMoreMessages, 500), [])
    const handleScroll = () => {
        isElementScrolledUp(chatRef)
            ? !showScrollButton && setShowScrollButton(true)
            : showScrollButton && setShowScrollButton(false)

        if (!chatRef) return
        const scrolledToTop = chatRef.scrollTop < 30
        if (scrolledToTop && scrolledOnChatLoad) messagesLoadWithDebounce()
    }

    const handleScrollClick = () => {
        if (chatRef) chatRef.scrollTop = chatRef.scrollHeight
    }

    return {handleScrollClick, handleScroll, showScrollButton}
}