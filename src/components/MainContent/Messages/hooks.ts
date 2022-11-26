import {useCallback, useEffect, useRef, useState} from "react";
import debounce from 'lodash.debounce'
import {MessagesRequestStatus} from "../../../types/MessagesTypes";

const isElementScrolledUp = (chatRef: HTMLUListElement | null): boolean => {
    if (!chatRef) return false
    const availableScrollHeight = chatRef.scrollHeight - chatRef.offsetHeight - 32
    return (chatRef.scrollTop + 70) < availableScrollHeight
}
const scrollChatToBottom = (chatRef: HTMLUListElement | null) => {
    if (!chatRef) return
    const scrolledUp = isElementScrolledUp(chatRef)
    if (!scrolledUp) chatRef.scrollTop = chatRef.scrollHeight
}

export const useFetchMessages = (
    messages: JSX.Element[],
    chatRef: { current: HTMLUListElement | null },
    scrolledOnChatLoad: { current: boolean },
    status: MessagesRequestStatus
) => {

    useEffect(() => {
        scrollChatToBottom(chatRef.current)
    }, [messages])

    useEffect(() => {
        if (!status.isLoading && !scrolledOnChatLoad.current) {
            if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
            scrolledOnChatLoad.current = true
        }
    }, [status.isLoading])

    useEffect(
        () => {
            const needToScroll = !status.isFetching && !status.allMessagesIsLoaded
            if (chatRef.current && needToScroll) chatRef.current.scrollTop = 1100
        }, [status.isFetching]
    )

}

export const useScrollChat = (
    loadMoreMessages: () => void,
    chatRef: { current: HTMLUListElement | null },
    scrolledOnChatLoad: { current: boolean },
) => {

    const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
    const messagesLoadWithDebounce = useCallback(debounce(loadMoreMessages, 500), [])
    const handleScroll = () => {
        isElementScrolledUp(chatRef.current)
            ? !showScrollButton && setShowScrollButton(true)
            : showScrollButton && setShowScrollButton(false)

        if (!chatRef.current) return
        const scrolledToTop = chatRef.current.scrollTop < 30
        if (scrolledToTop && scrolledOnChatLoad) messagesLoadWithDebounce()
    }

    const handleScrollClick = () => {
        if (chatRef.current) chatRef.current.scroll({
            top: chatRef.current?.scrollHeight,
            behavior: 'smooth'
        })
    }

    return {handleScrollClick, handleScroll, showScrollButton}
}