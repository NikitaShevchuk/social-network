// @ts-nocheck
import appReducer, { appInitialState, AppInitialState } from '..';
import { AsyncThunk } from '../../../Models';
import { AppActionTypes } from '../actions';
import { profileService } from '../../../../services/profileService';
import { AuthActionsTypes } from '../../auth-reducer/actions';
import authReducer, { authInitialState, AuthInitialState } from '../../auth-reducer';
import { initializeApp, tryToReconnect } from '../middleware';
import { authResponseTest, getProfileResponseTest } from './test-responses';
import { getActionBelonging } from './getActionBelonging';

let appState: AppInitialState;
let authState: AuthInitialState;
let dispatch: any;
const getState = jest.fn();

jest.mock('../../../../services/profileService');

beforeEach(() => {
    appState = appInitialState;
    authState = authInitialState;

    profileService.auth.mockReturnValue(Promise.resolve(authResponseTest));
    profileService.getProfile.mockReturnValue(Promise.resolve(getProfileResponseTest));
    profileService.getStatus.mockReturnValue(Promise.resolve('test status'));

    dispatch = (action: AppActionTypes | AuthActionsTypes | AsyncThunk) => {
        if (!action?.type) return action(dispatch, getState, {});
        const { isAppAction, isAuthAction } = getActionBelonging(action as AppActionTypes);
        if (isAppAction) appState = appReducer(appState, action);
        else if (isAuthAction) authState = authReducer(authState, action);
    };
});

test('Initialize thunk', async () => {
    const initializeAppThunk = initializeApp();
    await initializeAppThunk(dispatch, getState, {});
    expect(appState).toEqual({ ...appState, isInitialized: true });
    expect(authState).toEqual({ ...authState, isAuthorized: true });
});

test('Try to reconnect thunk', async () => {
    const tryToReconnectThunk = tryToReconnect();
    await tryToReconnectThunk(dispatch, getState, {});
    expect(appState).toEqual({ ...appState, isInitialized: true, appError: null });
    expect(authState).toEqual({ ...authState, isAuthorized: true });
});
