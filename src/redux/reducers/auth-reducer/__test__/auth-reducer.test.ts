// @ts-nocheck
import authReducer, { authInitialState, AuthInitialState } from '../index';
import { LoginResponse, PhotosResponse, profileService } from '../../../../services/profileService';
import { AuthActionsTypes } from '../actions';
import {
    authResponseTest,
    getProfileResponseTest
} from '../../app-reducer/__test__/test-responses';
import { authorize, loginThunk, logoutThunk, updStatusThunk } from '../middleware';
import { ResultCodes } from '../../../../services';
import { AsyncThunk } from '../../../Models';

let state: AuthInitialState;
let dispatch: any;
const getState = jest.fn();
export const defaultResponse = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
};
export const loginResponse: LoginResponse = {
    data: {
        login: 'test login',
        email: 'testmail@mail.com',
        id: 23122
    },
    resultCode: ResultCodes.Success,
    messages: []
};
export const updatePhotoResponse: PhotosResponse = {
    messages: [],
    data: { photos: { small: 'www.testphoto.com', large: 'www.testphoto.com' } },
    resultCode: ResultCodes.Success
};

jest.mock('../../../../services/profileService');

beforeEach(() => {
    state = authInitialState;
    profileService.auth.mockReturnValue(Promise.resolve(authResponseTest));
    profileService.getProfile.mockReturnValue(Promise.resolve(getProfileResponseTest));
    profileService.getStatus.mockReturnValue(Promise.resolve('test status'));
    profileService.updStatus.mockReturnValue(Promise.resolve(defaultResponse));
    profileService.login.mockReturnValue(Promise.resolve(loginResponse));
    profileService.logout.mockReturnValue(Promise.resolve(defaultResponse));
    profileService.uploadPhoto.mockReturnValue(Promise.resolve(updatePhotoResponse));
    profileService.updateProfile.mockReturnValue(Promise.resolve(defaultResponse));
    dispatch = (action: AuthActionsTypes | AsyncThunk) => {
        if (!action?.type) return action(dispatch, getState, {});
        state = authReducer(state, action);
    };
});

test('Authorize thunk', async () => {
    const authorizeThunk = authorize();
    await authorizeThunk(dispatch, getState, {});

    const stateAfterDispatch: AuthInitialState = {
        ...state,
        userData: authResponseTest.data,
        clientProfile: getProfileResponseTest,
        profileImg: getProfileResponseTest.photos.small,
        clientStatus: 'test status',
        isAuthorized: true
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Login thunk', async () => {
    const loginTestThunk = loginThunk({});
    await loginTestThunk(dispatch, getState, {});

    const stateAfterDispatch: AuthInitialState = {
        ...state,
        userData: authResponseTest.data,
        clientProfile: getProfileResponseTest,
        profileImg: getProfileResponseTest.photos.small,
        clientStatus: 'test status',
        isAuthorized: true,
        successLogin: true
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Logout thunk', async () => {
    const logoutThunkTest = logoutThunk();
    await logoutThunkTest(dispatch, getState, {});

    const stateAfterDispatch: AuthInitialState = {
        ...state,
        isAuthorized: false,
        successLogin: false,
        userData: { id: 0, login: null, email: null },
        profileImg: null
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Update status thunk', async () => {
    const updateStatusThunk = updStatusThunk('test status');
    await updateStatusThunk(dispatch, getState, {});

    const stateAfterDispatch: AuthInitialState = {
        ...state,
        clientStatus: 'test status'
    };
    expect(state).toEqual(stateAfterDispatch);
});
