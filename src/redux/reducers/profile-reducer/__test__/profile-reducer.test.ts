// @ts-nocheck
import profileReducer, { profileInitialState } from '..';
import { profileService } from '../../../../services/profileService';
import { usersService } from '../../../../services/usersService';
import { ProfileInitialState } from '../../../../types/ProfileTypes';
import { getProfileResponseTest } from '../../app-reducer/__test__/test-responses';
import {
    defaultResponse,
    updatePhotoResponse
} from '../../auth-reducer/__test__/auth-reducer.test';
import { ProfileActionsTypes } from '../actions';
import { followUser, loadProfile, unfollowUser, updatePhoto, updateProfile } from '../middleware';

let state: ProfileInitialState;
let dispatch: any;
const getState = jest.fn();

jest.mock('../../../../services/profileService');
jest.mock('../../../../services/usersService');

beforeEach(() => {
    state = profileInitialState;
    profileService.getProfile.mockReturnValue(Promise.resolve(getProfileResponseTest));
    profileService.getStatus.mockReturnValue(Promise.resolve('test status'));
    profileService.uploadPhoto.mockReturnValue(Promise.resolve(updatePhotoResponse));
    profileService.updateProfile.mockReturnValue(Promise.resolve(defaultResponse));
    usersService.isFollowing.mockReturnValue(Promise.resolve(true));
    usersService.follow.mockReturnValue(Promise.resolve(defaultResponse));
    usersService.unfollow.mockReturnValue(Promise.resolve(defaultResponse));
    dispatch = (action: ProfileActionsTypes) => {
        state = profileReducer(state, action);
    };
});

test('Load profile thunk', async () => {
    const loadProfileThunk = loadProfile(23122);
    await loadProfileThunk(dispatch, getState, {});
    const stateAfterDispatch: ProfileInitialState = {
        ...state,
        followed: true,
        profile: getProfileResponseTest,
        status: 'test status',
        profileFetchError: null,
        profileIsLoading: false
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Follow user profile thunk', async () => {
    const followUserProfileThunk = followUser(23122);
    await followUserProfileThunk(dispatch, getState, {});
    const stateAfterDispatch: ProfileInitialState = {
        ...state,
        followed: true
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Unfollow user profile thunk', async () => {
    const unfollowUserProfileThunk = unfollowUser(23122);
    await unfollowUserProfileThunk(dispatch, getState, {});
    const stateAfterDispatch: ProfileInitialState = {
        ...state,
        followed: false
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Update user photo thunk', async () => {
    const fakeImage = new File([''], 'fakeImage');
    const unfollowUserProfileThunk = updatePhoto(fakeImage);
    await unfollowUserProfileThunk(dispatch, getState, {});
    const stateAfterDispatch: ProfileInitialState = {
        ...state,
        profile: { ...state.profile, photos: updatePhotoResponse.data.photos }
    };
    expect(state).toEqual(stateAfterDispatch);
});

test('Update user profile thunk', async () => {
    const updateProfileThunk = updateProfile(getProfileResponseTest);
    await updateProfileThunk(dispatch, getState, {});
    const stateAfterDispatch: ProfileInitialState = {
        ...state,
        profile: getProfileResponseTest
    };
    expect(state).toEqual(stateAfterDispatch);
});
