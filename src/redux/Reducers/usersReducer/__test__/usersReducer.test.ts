import {IinitialState} from "../../../../types/usersTypes";
import usersReducer from "../index";
import {usersActions} from "../actions";
import {DefaultResponse, ResultCodes, usersApi} from "../../../../api/api";
import {followUser} from "../middleware";

let state: IinitialState;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'name 1',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 1',
                uniqueName: ''
            },
            {
                id: 1,
                name: 'name 2',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 2',
                uniqueName: ''
            },
        ],
        pageSize: 20,
        isFetching: true,
        disableWhileRequest: [],
        totalCount: 1,
        currentPage: 1
    }
})

// Actions test

test('follow action', () => {
    const newState = usersReducer(state, usersActions.followSuccessful(1))
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow action', () => {
    const newState = usersReducer(state, usersActions.unfollowSuccessful(0))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
})

// Thunks test

jest.mock("../../../../api/api")

const result: DefaultResponse = {
    resultCode: ResultCodes.Success,
    messages: ['mess'],
    data: {}
}

// @ts-ignore
usersApi.follow.mockReturnValue(Promise.resolve(result))

test('follow thunk', async () => {

    const thunk = followUser(1)

    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
})




