import { DialogsInitialState } from '../../../types/MessagesTypes';
import { filterDialogsByName } from '../../helpers/reducerHelpers';
import { setSingleConversationHead } from './helpers';
import { DialogsActionsType } from './actions';

export const dialogsInitialState: DialogsInitialState = {
    dialogs: [],
    dialogsIsLoading: true,
    dialogsError: null,
    conversationHead: {
        id: null,
        photo: null,
        userName: null
    }
};

const dialogsReducer = (
    state: DialogsInitialState = dialogsInitialState,
    action: DialogsActionsType
) => {
    switch (action.type) {
        case 'messages-reducer/SET_DIALOG':
            return {
                ...state,
                dialogs: action.dialogs
            };
        case 'messages-reducer/SET_FILTERED_DIALOGS':
            return {
                ...state,
                dialogs: filterDialogsByName([...state.dialogs], action.userName)
            };
        case 'messages-reducer/SET_CONVERSATION_HEAD':
            return setSingleConversationHead(state, action);
        case 'messages-reducer/SET_DIALOGS_ERROR':
            return {
                ...state,
                dialogsError: action.errorText
            };
        case 'messages-reducer/CLEAR_DIALOGS_ERROR':
            return {
                ...state,
                dialogsError: null
            };
        case 'messages-reducer/SET_IS_DIALOGS_LOADING':
            return {
                ...state,
                dialogsIsLoading: action.isLoading
            };
        default:
            return state;
    }
};

export default dialogsReducer;
