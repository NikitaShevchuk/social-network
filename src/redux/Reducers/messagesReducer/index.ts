import {filterDialogsByName} from "../../Helpers/reducerHelpers";
import {Idialog, InitialState,} from '../../../types/messagesTypes';
import {MessagesActionsType} from "./actions";

export const initialState: InitialState = {
    messages: [],
    dialogs: [],
    conversationHead: {
        id: null,
        photo: null,
        userName: null
    }
}

const messagesReducer = (state: InitialState = initialState, action: MessagesActionsType) => {
    switch(action.type) {
        case 'messagesReducer/SET_DIALOG':
            return {
                ...state,
                dialogs: action.dialogs
            }
        case 'messagesReducer/SET_FILTERED_DIALOGS':
            // @ts-ignore
            const dialogs: Idialog[] = [...state.dialogs]
            return {
                ...state,
                dialogs: filterDialogsByName(dialogs, action.userName)
            }
        case 'messagesReducer/SET_NEW_DIALOG':
            return {
                ...state,
                dialogs: [...state.dialogs, action.newDialog]
            }
        case 'messagesReducer/SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
        case 'messagesReducer/SET_CONVERSATION_HEAD':
            let dialogIndex: number = state.dialogs.findIndex(
                ( d: Idialog) => d.id === action.id
            )
            if (dialogIndex !== -1) {
                return {
                    ...state,
                    conversationHead: {
                        photo: state.dialogs[dialogIndex]?.photos.small,
                        id: state.dialogs[dialogIndex]?.id,
                        userName: state.dialogs[dialogIndex]?.userName
                    }
                }
            } else {
                return {...state, ...state.conversationHead}
            }
        default:
            return state;
    }
}

export default messagesReducer;