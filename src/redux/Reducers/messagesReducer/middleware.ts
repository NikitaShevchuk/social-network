import {dialogsApi} from "../../../api/api";
import {messagesActions} from "./actions";
import {Idialog} from "../../../types/messagesTypes";
import {RootState} from "../../redux-store";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

type ThunkType = ThunkAction<void, RootState, any, AnyAction>
type AsyncThunkType = ThunkAction<Promise<void>, RootState, any, AnyAction>

export const setAllMessages = (id: number): AsyncThunkType => async (dispatch)=> {
    const data = await dialogsApi.requireMessages(id, '2022-05-10')
    dispatch(messagesActions.setMessages(data))
}
export const sendNewMessage = (id: number, body: string): ThunkType => async (dispatch)=> {
    await dialogsApi.sendMessage(id, body)
    dispatch(setAllMessages(id))
}
export const getDialog = (id: number): AsyncThunkType => async (dispatch)=> {
    const data = await dialogsApi.startDialog(id)
    dispatch(messagesActions.setNewDialog(data.data))
}
export const setDialogs = (id: number): AsyncThunkType => async (dispatch)=> {
    const data = await dialogsApi.requireDialogs();
    const dialogs = await Promise.all( data.map( async (d: Idialog) => {
        const lastMessage = await dialogsApi.requireLastMessage(d.id)
        return ({...d, lastMessage: lastMessage.items[0]})
    }));
    dispatch(messagesActions.setDialog(dialogs))
    dispatch(messagesActions.setConversationHead(id))
}
export const filterDialogs = (userName: string): ThunkType => (dispatch) => {
    dispatch(messagesActions.setFilteredDialogs(userName))
}