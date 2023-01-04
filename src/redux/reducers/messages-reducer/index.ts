import { MessagesInitialState } from '../../../types/MessagesTypes';
import { MessagesActionsType } from './actions';
import { getUniqueMessages } from './helpers';

export const initialState: MessagesInitialState = {
    dialogUserId: 0,
    messages: [],
    totalMessagesCount: 0,
    count: 20,
    pageNumber: 1,
    status: {
        isLoading: true,
        isFetching: false,
        allMessagesIsLoaded: false
    },
    messagesError: null
};

const messagesReducer = (
    state: MessagesInitialState = initialState,
    action: MessagesActionsType
) => {
    switch (action.type) {
        case 'messages-reducer/SET_DIALOG_USER_ID':
            return {
                ...state,
                dialogUserId: action.userId
            };
        case 'messages-reducer/SET_MESSAGES':
            return {
                ...state,
                messages: action.messages
            };
        case 'messages-reducer/SET_MORE_MESSAGES':
            return {
                ...state,
                messages: [...action.messages, ...state.messages]
            };
        case 'messages-reducer/SET_IS_MESSAGES_LOADED':
            return {
                ...state,
                status: { ...state.status, allMessagesIsLoaded: action.isLoaded }
            };
        case 'messages-reducer/UPDATE_MESSAGES':
            return {
                ...state,
                messages: getUniqueMessages(state.messages, action.newMessages)
            };
        case 'messages-reducer/ADD_NEW_MESSAGE':
            return {
                ...state,
                messages: getUniqueMessages(state.messages, [action.newMessage])
            };
        case 'messages-reducer/SET_MESSAGES_ERROR':
            return {
                ...state,
                messagesError: action.errorText
            };
        case 'messages-reducer/CLEAR_MESSAGES_ERROR':
            return {
                ...state,
                messagesError: null
            };
        case 'messages-reducer/SET_IS_MESSAGES_LOADING':
            return {
                ...state,
                status: { ...state.status, isLoading: action.isLoading }
            };
        case 'messages-reducer/SET_IS_MESSAGES_FETCHING':
            return {
                ...state,
                status: { ...state.status, isFetching: action.isFetching }
            };
        case 'messages-reducer/SET_PAGE_NUMBER':
            return {
                ...state,
                pageNumber: action.pageNumber
            };
        case 'messages-reducer/SET_COUNT':
            return {
                ...state,
                count: action.count
            };
        case 'messages-reducer/SET_TOTAL_MESSAGES_COUNT':
            return {
                ...state,
                totalMessagesCount: action.count
            };
        default:
            return state;
    }
};

export default messagesReducer;
