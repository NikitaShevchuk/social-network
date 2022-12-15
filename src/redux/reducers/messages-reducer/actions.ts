import {Message} from "../../../types/MessagesTypes";
import {InferActionsTypes} from "../../redux-store";

export const messagesActions = {
    
    setDialogUserId: (userId: number) => ({type: 'messages-reducer/SET_DIALOG_USER_ID', userId} as const),
    setMoreMessages: (messages: Message[]) => ({type: 'messages-reducer/SET_MORE_MESSAGES', messages} as const),
    setMessages: (messages: Message[]) => ({type: 'messages-reducer/SET_MESSAGES', messages} as const),
    setTotalMessagesCount: (count: number) => ({type: 'messages-reducer/SET_TOTAL_MESSAGES_COUNT', count} as const),
    updateMessages: (newMessages: Message[]) => ({type: 'messages-reducer/UPDATE_MESSAGES', newMessages} as const),
    addNewMessage: (newMessage: Message) => ({type: 'messages-reducer/ADD_NEW_MESSAGE', newMessage} as const),
    setPageNumber: (pageNumber: number) => ({type: 'messages-reducer/SET_PAGE_NUMBER', pageNumber} as const),
    setCount: (count: number) => ({type: 'messages-reducer/SET_COUNT', count} as const),
    setIsAllMessagesLoaded: (isLoaded: boolean) => ({type: 'messages-reducer/SET_IS_MESSAGES_LOADED', isLoaded} as const),

    // Errors handle
    setMessagesError: (errorText: string) => ({type: 'messages-reducer/SET_MESSAGES_ERROR', errorText} as const),
    clearMessagesError: () => ({type: 'messages-reducer/CLEAR_MESSAGES_ERROR'} as const),

    // Set is loading
    setIsMessagesLoading: (isLoading: boolean) => ({type: 'messages-reducer/SET_IS_MESSAGES_LOADING', isLoading} as const),
    setIsMessagesFetching: (isFetching: boolean) => ({type: 'messages-reducer/SET_IS_MESSAGES_FETCHING', isFetching} as const),
}

export const {setPageNumber, setDialogUserId, setIsAllMessagesLoaded} = messagesActions

export type MessagesActionsType = InferActionsTypes<typeof messagesActions>