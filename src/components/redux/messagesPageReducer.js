import {dialogsApi} from "./api";
import {filterDialogsByName} from "./reducerHelpers";

//const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_DIALOG = 'SET_DIALOG';
const SET_NEW_DIALOG = 'SET_NEW_DIALOG';
const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';
const SET_CONVERSATION_HEAD = 'SET_CONVERSATION_HEAD';
const SET_FILTERED_DIALOGS = 'SET_FILTERED_DIALOGS';

let initialState = {
    messages: [],
    dialogs: [],
    lastMessages: [],
    conversationHead: {
        photo: null,
        userName: null
    }
}

const messagesPageReducer = (state = initialState, action) => {
    switch(action.type) {
        // case SET_NEW_MESSAGE:
        //     return {
        //         ...state,
        //         messages: [...state.messages, action.body.body]
        //     }
        case SET_DIALOG:
            return {
                ...state,
                dialogs: action.dialog
            }
        case SET_FILTERED_DIALOGS:
            return {
                ...state,
                dialogs: filterDialogsByName([...state.dialogs], action.userName)
            }
        case SET_NEW_DIALOG:
            return {
                ...state,
                dialogs: [...state.dialogs, ...action.newDialog]
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case SET_LAST_MESSAGE:
            return {
                ...state,
                dialogs: []
            }
        case SET_CONVERSATION_HEAD:
            let dialogIndex = state.dialogs.findIndex( d => d.id == action.id )
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
                return {...state}
            }
        default:
            return state;
    }
}


// const setNewMessage = (body) => ({type: SET_NEW_MESSAGE, body})
const setMessages = messages => ({type: SET_MESSAGES, messages})
const setDialog = dialog => ({type: SET_DIALOG, dialog})
const setNewDialog = newDialog => ({type: SET_NEW_DIALOG, newDialog})
const setLastMessage = lastMessage => ({type: SET_LAST_MESSAGE, lastMessage})
const setConversationHead = id => ({type: SET_CONVERSATION_HEAD, id })
const setFilteredDialogs = userName => ({type: SET_FILTERED_DIALOGS, userName })

export const setAllMessages = id => async dispatch => {
    let data = await dialogsApi.requireMessages(id, '2022-05-10')
    dispatch(setMessages(data))
}
export const sendNewMessage = (id, body) => dispatch => {
    dialogsApi.sendMessage(id, body).then(data => {
        dispatch(setAllMessages(id))
    })
}
export const getDialog = id => async dispatch => {
    let data = await dialogsApi.startDialog(id)
    dispatch(setNewDialog(data.data))
}
export const setDialogs = id => async dispatch => {
    let data = await dialogsApi.requireDialogs();
    let dialog =  await Promise.all( data.map( async d => {
        let lastMessage = await dialogsApi.requireLastMessage(d.id)
        return ({...d, lastMessage: lastMessage.items[0]})
    }));
    dispatch(setDialog(dialog))
    dispatch(setConversationHead(id))
}

export const filterDialogs = userName => dispatch => {
    dispatch(setFilteredDialogs(userName))
}

export default messagesPageReducer;