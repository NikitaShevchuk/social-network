import {messagesActions} from "./actions";
import {Message, NewMessageFormData} from "../../../types/MessagesTypes";
import {dialogsService} from "../../../services/dialogsService";
import {AsyncThunk} from "../../Models";
import {ResultCodes} from "../../../services";
import {appActions} from "../app-reducer/actions";
import {dialogsActions} from "../dialogs-reducer/actions";

const getDate = (): string => {
    const date = new Date()
    date.setHours(date.getHours() - 12, 0, 0, 0)
    return date.toISOString()
}


export const loadMessagesByDate = (date: string = getDate()): AsyncThunk => async (dispatch, getState)=> {
    const id = getState().messagesPage.dialogUserId
    dispatch(messagesActions.setIsMessagesLoading(true))
    try {
        const messagesResponse = await dialogsService.requireMessagesByDate(id, date)
        dispatch(messagesActions.setMessages(messagesResponse.items))
    } catch {
        dispatch(appActions.addError("Can't load messages"))
    }
    dispatch(messagesActions.setIsMessagesLoading(false))
}

export const changeChat = (): AsyncThunk => (dispatch, getState) => {
    const {dialogUserId} = getState().messagesPage
    dispatch(messagesActions.setPageNumber(1))
    dispatch(messagesActions.setIsAllMessagesLoaded(false))
    dispatch(messagesActions.clearMessagesError())
    dispatch(dialogsActions.setConversationHead(dialogUserId))
}

export const loadMessages = (): AsyncThunk => async (dispatch, getState)=> {
    dispatch(messagesActions.setIsMessagesLoading(true))
    const {dialogUserId} = getState().messagesPage
    dispatch(changeChat())
    try {
        const {count} = getState().messagesPage
        const messagesResponse = await dialogsService.requireMessages(dialogUserId, count, 1)
        dispatch(messagesActions.setMessages(messagesResponse.items))
        dispatch(messagesActions.setTotalMessagesCount(messagesResponse.totalCount))
    } catch {
        dispatch(appActions.addError("Can't load messages"))
    }
    dispatch(messagesActions.setIsMessagesLoading(false))
}


const isLastMessageIdEqual = (messages: Message[], messagesInResponse: Message[]): boolean => {
    const lastIdInResponse = messagesInResponse[messagesInResponse.length - 1].id
    const lastIdInState = messages[messages.length - 1].id
    return lastIdInResponse === lastIdInState
}
export const fetchMessages = (): AsyncThunk => async (dispatch, getState)=> {
    try {
        const {count, dialogUserId} = getState().messagesPage
        const messagesResponse = await dialogsService.requireMessages(dialogUserId, count, 1)
        const {messages, messagesError} = getState().messagesPage
        if (messagesError) dispatch(messagesActions.clearMessagesError())
        const haveNewMessages = !isLastMessageIdEqual(messages, messagesResponse.items)
        if (haveNewMessages) {
            dispatch(messagesActions.updateMessages(messagesResponse.items))
            dispatch(messagesActions.setTotalMessagesCount(messagesResponse.totalCount))
        }
    } catch {
        dispatch(appActions.addError("Can't load messages"))
    }
}

export const loadMoreMessages = (): AsyncThunk => async (dispatch, getState) => {
    const {dialogUserId, messages, pageNumber, status} = getState().messagesPage
    const {totalCount: totalCountInResponse} = await dialogsService.requireLastMessage(dialogUserId)

    if (totalCountInResponse === messages.length) {
        if(!status.allMessagesIsLoaded) dispatch(messagesActions.setIsAllMessagesLoaded(true))
        return
    }

    dispatch(messagesActions.setIsMessagesFetching(true))
    if (status.allMessagesIsLoaded) dispatch(messagesActions.setIsAllMessagesLoaded(false))
    dispatch(messagesActions.setPageNumber(pageNumber + 1))
    try {
        const {pageNumber, count} = getState().messagesPage
        const messagesResponse = await dialogsService.requireMessages(dialogUserId, count, pageNumber)
        dispatch(messagesActions.setMoreMessages(messagesResponse.items))
        dispatch(messagesActions.setTotalMessagesCount(messagesResponse.totalCount))
    } catch {
        const {pageNumber} = getState().messagesPage
        dispatch(messagesActions.setPageNumber(pageNumber - 1))
        dispatch(appActions.addError("Can't load messages"))
    }
    dispatch(messagesActions.setIsMessagesFetching(false))
}

export const sendNewMessage = (formData: NewMessageFormData): AsyncThunk => async (dispatch, getState)=> {
    const id = getState().messagesPage.dialogUserId
    try {
        const sendRequestResponse = await dialogsService.sendMessage(id, formData)
        if (sendRequestResponse.resultCode === ResultCodes.Success) {
            const sentMessage = sendRequestResponse.data.message
            dispatch(messagesActions.addNewMessage(sentMessage))
        } else dispatch(appActions.addError(sendRequestResponse.messages[0]))
    } catch {
        dispatch(appActions.addError("Can't send message"))
    }
}
