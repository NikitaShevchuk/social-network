import {AsyncThunk} from "../../Models";
import {dialogsService} from "../../../services/dialogsService";
import {DialogWithMessage} from "../../../types/MessagesTypes";
import {addLastMessageToDialog} from "../messages-reducer/helpers";
import {appActions} from "../app-reducer/actions";
import {dialogsActions} from "./actions";

export const setDialogs = (): AsyncThunk => async (dispatch, getState)=> {
    dispatch(dialogsActions.setIsDialogsLoading(true))
    try {
        const allDialogsResponse = await dialogsService.requireDialogs()
        const dialogs: DialogWithMessage[] = await Promise.all(
            allDialogsResponse.map(addLastMessageToDialog)
        )
        dispatch(dialogsActions.setDialogs(dialogs))
        const {dialogUserId} = getState().messagesPage
        const {conversationHead} = getState().dialogsPage
        if (!conversationHead.userName && dialogUserId !== 0) {
            dispatch(dialogsActions.setConversationHead(dialogUserId))
        }
        dispatch(dialogsActions.clearDialogsError())
    } catch {
        dispatch(dialogsActions.setDialogsError("Can't load dialogs"))
    }
    dispatch(dialogsActions.setIsDialogsLoading(false))
}

export const getDialog = (id: number): AsyncThunk => async (dispatch)=> {
    try {
        const dialogResponse = await dialogsService.startDialog(id)
        dispatch(setDialogs())
    } catch {
        appActions.addError("Can't start a dialog")
    }
}
export const filterDialogs = (userName: string): AsyncThunk => (dispatch) => {
    dispatch(dialogsActions.setFilteredDialogs(userName))
}