import {DialogWithMessage, Message} from "../../../types/MessagesTypes";
import {InferActionsTypes} from "../../redux-store";

export const messagesActions = {
    setMessages: (messages: Message[]) => ({type: 'messagesReducer/SET_MESSAGES', messages} as const),
    setDialog: (dialogs: DialogWithMessage[]) => ({type: 'messagesReducer/SET_DIALOG', dialogs} as const),
    setConversationHead: (id: number) => ({type: 'messagesReducer/SET_CONVERSATION_HEAD', id } as const),
    setFilteredDialogs: (userName: string) => ({type: 'messagesReducer/SET_FILTERED_DIALOGS', userName} as const),

    // Errors handle
    setMessagesError: (errorText: string) => ({type: 'messagesReducer/SET_MESSAGES_ERROR', errorText} as const),
    clearMessagesError: () => ({type: 'messagesReducer/CLEAR_MESSAGES_ERROR'} as const),
    setDialogsError: (errorText: string) => ({type: 'messagesReducer/SET_DIALOGS_ERROR', errorText} as const),
    clearDialogsError: () => ({type: 'messagesReducer/CLEAR_DIALOGS_ERROR'} as const),

    // Set is loading
    setIsMessagesLoading: (isLoading: boolean) => ({type: 'messagesReducer/SET_IS_MESSAGES_LOADING', isLoading} as const),
    setIsDialogsLoading: (isLoading: boolean) => ({type: 'messagesReducer/SET_IS_DIALOGS_LOADING', isLoading} as const),
}

export const {
    setMessagesError, setMessages, setFilteredDialogs, setDialog,
    setConversationHead, setIsMessagesLoading, setDialogsError, clearDialogsError,
    clearMessagesError, setIsDialogsLoading
} = messagesActions

export type MessagesActionsType = InferActionsTypes<typeof messagesActions>