import {messagesActions} from "./actions";
import {DialogWithMessage} from "../../../types/MessagesTypes";
import {dialogsService} from "../../../services/dialogsService";
import {AsyncThunk} from "../../Models";
import {ResultCodes} from "../../../services";
import {appActions} from "../appReducer/actions";
import {addLastMessageToDialog} from "./helpers";

export const setAllMessages = (id: number, date: string = '2022-05-10'): AsyncThunk => async (dispatch)=> {
    try {
        const messagesResponse = await dialogsService.requireMessages(id, date)
        dispatch(messagesActions.setMessages(messagesResponse))
    } catch {
        dispatch(appActions.addError("Can't load messages"))
    }
}
export const sendNewMessage = (id: number, body: string): AsyncThunk => async (dispatch)=> {
    try {
        const sendRequestResponse = await dialogsService.sendMessage(id, body)
        if (sendRequestResponse.resultCode === ResultCodes.Success) {
            dispatch(setAllMessages(id))
        } else dispatch(appActions.addError(sendRequestResponse.messages[0]))
    } catch {
        dispatch(appActions.addError("Can't send message"))
    }
}

export const setDialogs = (): AsyncThunk => async (dispatch)=> {
    dispatch(messagesActions.setIsDialogsLoading(true))
    try {
        const allDialogsResponse = await dialogsService.requireDialogs()
        const dialogs: DialogWithMessage[] = await Promise.all(
            allDialogsResponse.map(addLastMessageToDialog)
        )
        dispatch(messagesActions.setDialog(dialogs))
        dispatch(messagesActions.clearDialogsError())
    } catch {
        dispatch(messagesActions.setDialogsError("Can't load dialogs"))
    }
    dispatch(messagesActions.setIsDialogsLoading(false))
}
export const getDialog = (id: number): AsyncThunk => async (dispatch)=> {
    try {
        const dialogResponse = await dialogsService.startDialog(id)
        if (dialogResponse.resultCode === ResultCodes.Success) {
            dispatch(setDialogs())
            dispatch(messagesActions.setConversationHead(id))
        } else appActions.addError(dialogResponse.messages[0])
    } catch {
        appActions.addError("Can't start a dialog")
    }
}
export const filterDialogs = (userName: string): AsyncThunk => (dispatch) => {
    dispatch(messagesActions.setFilteredDialogs(userName))
}