import {dialogsApi} from "./api";

//const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_DIALOG = 'SET_DIALOG';
const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';
const SET_CONVERSATION_HEAD = 'SET_CONVERSATION_HEAD';

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
                dialogs: [...action.dialog]
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
const setLastMessage = lastMessage => ({type: SET_LAST_MESSAGE, lastMessage})
const setConversationHead = id => ({type: SET_CONVERSATION_HEAD, id })

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
    // let data = await dialogsApi.startDialog(id)
    // dispatch(setDialog(data.data))
}
export const setDialogs = id => async dispatch => {
    let data = await dialogsApi.requireDialogs();
    let dialog =  await Promise.all( data.map( async d => {
        let lasMessage = await dialogsApi.requireLastMessage(d.id)
        return ({...d, lastMessage: lasMessage.items[0]})
    }));
    dispatch(setDialog(dialog))
    dispatch(setConversationHead(id))
}

export default messagesPageReducer;