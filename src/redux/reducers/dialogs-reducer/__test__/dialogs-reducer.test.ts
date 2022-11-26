import {Dialog, DialogsInitialState} from "../../../../types/MessagesTypes";
import {DialogsActionsType} from "../actions";
import dialogsReducer, {dialogsInitialState} from "../index";
import {setDialogs} from "../middleware";
import {dialogsService, MessagesResponse, StartDialogResponse} from "../../../../services/dialogsService";
import {ResultCodes} from "../../../../services";

let state: DialogsInitialState

let dispatch = (action: DialogsActionsType) => {
    state = dialogsReducer(state, action)
}

let getState = () => ({dialogsPage: state, messagesPage: {dialogsUserId: 0}})

let response: Dialog[]

let lastMessageResponse: MessagesResponse

jest.mock('../../../../services/dialogsService')

const startDialogResponse: StartDialogResponse = {
    data: {},
    messages: [],
    resultCode: ResultCodes.Success
}

beforeEach(() => {
    state = dialogsInitialState
    response = [
        {
            id: 24038,
            userName: "nikitashev1112",
            hasNewMessages: false,
            lastDialogActivityDate: "2022-11-22T16:15:26.633",
            lastUserActivityDate: "2022-11-22T15:33:22.293",
            newMessagesCount: 0,
            photos: {
                small: "https://social-network.samuraijs.com/activecontent/images/users/24038/user-small.jpg?v=1",
                large: "https://social-network.samuraijs.com/activecontent/images/users/24038/user.jpg?v=1"
            }
        }
    ]
    lastMessageResponse = {
        items: [
            {
                id: "765ac8ee-c037-4bc0-88dd-c6c8e9b3051c",
                body: "sssss",
                translatedBody: null,
                addedAt: "2022-11-22T16:15:19.463",
                senderId: 24038,
                senderName: "nikitashev1112",
                recipientId: 23790,
                viewed: true,
                senderPhoto: null,
                recipientName: 'name',
                profileImg: null,
                distributionId: 2,
                myId: 2,
                isSpam: false,
                deletedBySender: false,
                deletedByRecipient: false
            }
        ],
        totalCount: 2,
        error: null
    }
    getState = () => ({dialogsPage: state, messagesPage: {dialogsUserId: 0}})
    dispatch = (action: DialogsActionsType) => {
        state = dialogsReducer(state, action)
    }
    // @ts-ignore
    dialogsService.requireDialogs.mockReturnValue(Promise.resolve(response))
    // @ts-ignore
    dialogsService.requireLastMessage.mockReturnValue(Promise.resolve(lastMessageResponse))
})

test('setDialogs thunk should set dialogs with last message to state', async () => {
    const setDialogsThunk = setDialogs()
    // @ts-ignore
    await setDialogsThunk(dispatch, getState, {})
    // setDialogs thunk adds last message to every dialog
    expect(state.dialogs).toEqual([{...response, lastMessage: lastMessageResponse.items[0]}])
})
