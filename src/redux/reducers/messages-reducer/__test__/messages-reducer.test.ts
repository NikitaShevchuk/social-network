// @ts-nocheck
import {MessagesInitialState} from "../../../../types/MessagesTypes";
import {dialogsService, MessagesResponse} from "../../../../services/dialogsService";
import {fetchMessages, loadMessages, loadMoreMessages, sendNewMessage} from "../middleware";
import messagesReducer from "../index";
import {MessagesActionsType} from "../actions";
import {ResultCodes} from "../../../../services";

let state: MessagesInitialState;

let dispatch = (action: MessagesActionsType) => {
    state = messagesReducer(state, action)
}
let getState = () => ({messagesPage: state})

let response: MessagesResponse

beforeEach(() => {
    state = {
        dialogUserId: 1,
        messages: [{
            id: "765ac8ee-c037-4bc0-88dd-c6c8e9b3051f",
            addedAt: '',
            body: 'test message',
            deletedByRecipient: false,
            deletedBySender: false,
            isSpam: false,
            myId: 2,
            distributionId: null,
            profileImg: null,
            recipientId: 2,
            recipientName: 'test name',
            senderId: 2,
            senderName: 'test',
            senderPhoto: null,
            viewed: false,
            translatedBody: null
        }],
        totalMessagesCount: 0,
        count: 20,
        pageNumber: 1,
        status: {
            isLoading: true,
            isFetching: false,
            allMessagesIsLoaded: false
        },
        messagesError: null,
    };
    dispatch = (action: MessagesActionsType) => {
        state = messagesReducer(state, action)
    }
    getState = () => ({messagesPage: state})
    response = {
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
            },
            {
                id: "765ac8ee-c037-4bc0-88dd-c6c8e9b3051f", // try to add message with same id as first message in state
                addedAt: '',
                body: 'test message',
                deletedByRecipient: false,
                deletedBySender: false,
                isSpam: false,
                myId: 2,
                distributionId: null,
                profileImg: null,
                recipientId: 2,
                recipientName: 'test name',
                senderId: 2,
                senderName: 'test',
                senderPhoto: null,
                viewed: false,
                translatedBody: null
            },
            {
                id: "e702d8c7-c7b8-4eac-b31b-2b45aa4c1f0d",
                body: "aaaa",
                translatedBody: null,
                addedAt: "2022-11-22T16:15:26.633",
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
            },
        ],
        totalCount: 2,
        error: null
    }
})

jest.mock('../../../../services/dialogsService')


// Test messages middleware

test('Fetch messages thunk should add new messages to state with no repeat of messages', async () => {
    const oldState = JSON.parse(JSON.stringify(state))
    const fetchMessagesThunk = fetchMessages()

    dialogsService.requireMessages.mockReturnValue(Promise.resolve(response))
    await fetchMessagesThunk(dispatch, getState, {})

    // the second message in response have same ID as first message in state, so it won't be dispatched to state
    expect(state.messages).toEqual([...oldState.messages, response.items[0], response.items[2]])
})

test('Load messages should add messages to state', async () => {
    const loadMessagesThunk = loadMessages()
    dialogsService.requireMessages.mockReturnValue(Promise.resolve(response))
    await loadMessagesThunk(dispatch, getState, {})
    expect(state.messages).toEqual(response.items)
    expect(state.status.isLoading).toEqual(false)
    expect(state.status.allMessagesIsLoaded).toEqual(false)
    expect(state.pageNumber).toEqual(1)
    expect(state.totalMessagesCount).toEqual(response.totalCount)
})

test('Thunk for loading more messages should add more messages to state', async () => {
    const oldState = JSON.parse(JSON.stringify(state))
    const loadMoreMessageThunk = loadMoreMessages()
    dialogsService.requireLastMessage.mockReturnValue(Promise.resolve(response))
    dialogsService.requireMessages.mockReturnValue(Promise.resolve(response))
    await loadMoreMessageThunk(dispatch, getState, {})
    expect(state.messages).toEqual([...response.items, ...oldState.messages])
    expect(state.status.isFetching).toEqual(false)
    expect(state.pageNumber).toEqual(oldState.pageNumber + 1)
    expect(state.totalMessagesCount).toEqual(response.totalCount)
})

test('sendMessage thunk should add new message to state', async () => {
    const oldState = JSON.parse(JSON.stringify(state))
    const testMessageFormData = {body: 'new test message'}
    const sendNewMessageThunk = sendNewMessage(testMessageFormData)
    response.items[0].body = testMessageFormData.body
    dialogsService.sendMessage.mockReturnValue(Promise.resolve(
        {resultCode: ResultCodes.Success, data: {message: response.items[0]}})
    )
    await sendNewMessageThunk(dispatch, getState, {})
    expect(state.messages).toEqual([...oldState.messages, response.items[0]])
})