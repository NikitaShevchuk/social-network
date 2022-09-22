import {Idialog, Imessage} from "../../../types/messagesTypes";
import {InferActionsTypes} from "../../redux-store";

export const messagesActions = {
    setMessages: (messages: Imessage[]) => ({type: 'messagesReducer/SET_MESSAGES', messages} as const),
    setDialog: (dialogs: Idialog[]) => ({type: 'messagesReducer/SET_DIALOG', dialogs} as const),
    setNewDialog: (newDialog: Idialog) => ({type: 'messagesReducer/SET_NEW_DIALOG', newDialog} as const),
    setConversationHead: (id: number) => ({type: 'messagesReducer/SET_CONVERSATION_HEAD', id } as const),
    setFilteredDialogs: (userName: string) => ({type: 'messagesReducer/SET_FILTERED_DIALOGS', userName} as const)
}

export type MessagesActionsType = InferActionsTypes<typeof messagesActions>

