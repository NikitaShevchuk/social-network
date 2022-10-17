import {filterDialogsByName} from "../../helpers/reducerHelpers";
import {DialogWithMessage, MessagesInitialState,} from '../../../types/MessagesTypes';
import {MessagesActionsType} from "./actions";

export const initialState: MessagesInitialState = {
    messages: [],
    dialogs: [],
    conversationHead: {
        id: null,
        photo: null,
        userName: null
    },
    messagesError: null,
    dialogsError: null,
    dialogsIsLoading: true,
    messagesIsLoading: true
}

const messagesReducer = (state: MessagesInitialState = initialState, action: MessagesActionsType) => {
    switch(action.type) {
        case 'messagesReducer/SET_DIALOG':
            return {
                ...state,
                dialogs: action.dialogs
            }
        case 'messagesReducer/SET_FILTERED_DIALOGS':
            const dialogs: DialogWithMessage[] = [...state.dialogs]
            return {
                ...state,
                dialogs: filterDialogsByName(dialogs, action.userName)
            }
        case 'messagesReducer/SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            }
        case 'messagesReducer/SET_CONVERSATION_HEAD':
            const dialogIndex: number = state.dialogs.findIndex(
                (dialog: DialogWithMessage) => dialog.id === action.id
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
            } else return state
        case 'messagesReducer/SET_MESSAGES_ERROR':
            return {
                ...state,
                messagesError: action.errorText
            }
        case 'messagesReducer/CLEAR_MESSAGES_ERROR':
            return {
                ...state,
                messagesError: null
            }
        case 'messagesReducer/SET_DIALOGS_ERROR':
            return {
                ...state,
                dialogsError: action.errorText
            }
        case 'messagesReducer/CLEAR_DIALOGS_ERROR':
            return {
                ...state,
                dialogsError: null
            }
        case "messagesReducer/SET_IS_MESSAGES_LOADING":
            return {
                ...state,
                messagesIsLoading: action.isLoading
            }
        case 'messagesReducer/SET_IS_DIALOGS_LOADING':
            return {
                ...state,
                dialogsIsLoading: action.isLoading
            }
        default:
            return state;
    }
}

export default messagesReducer;