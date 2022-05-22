import {profileApi, usersApi} from "./api";

const SET_PROFILE = 'SET_PROFILE';
const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const DISABLE_BUTTON = 'DISABLE_BUTTON';
const ABLE_BUTTON = 'ABLE_BUTTON';
const SET_STATUS = 'SET_STATUS';
const UPD_STATUS = 'UPD_STATUS'

let initialState = {
    profile: null,
    disableWhileRequest: false,
    followed: false,
    status: ''
}


const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case FOLLOW_USER:
            return {
                ...state,
                followed: true
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                followed: false
            }
        case ABLE_BUTTON:
            return {
                ...state,
                disableWhileRequest: false
            }
        case DISABLE_BUTTON:
            return {
                ...state,
                disableWhileRequest: true
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPD_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

const setProfile = (profile) => ({type: SET_PROFILE, profile})
const followUserProfile = () => ({type: FOLLOW_USER})
const unfollowUserProfile = () => ({type: UNFOLLOW_USER})
const disableButton = () => ({type: DISABLE_BUTTON})
const ableButton = () => ({type: ABLE_BUTTON})
const setStatus = (status) => ({type: SET_STATUS, status})
const updStatus = (status) => ({type: UPD_STATUS, status})

export const updStatusThunk = (status) => (dispatch) => {
    profileApi.updStatus(status).then( data => {
        if (data.resultCode === 0) dispatch(updStatus(status))
    } )
}

export const loadProfile = (id) => async (dispatch) => {
    let data = await usersApi.isFollowing(id)
    if (data) {
        dispatch(followUserProfile());
    } else {
        dispatch(unfollowUserProfile());
    }
    let dataProfile = await profileApi.getProfile(id)
    dispatch(setProfile(dataProfile))
    let dataStatus = await profileApi.getStatus(id)
    dispatch(setStatus(dataStatus))
}
export const followUser = (id) => (dispatch) => {
    dispatch(disableButton());
    usersApi.follow(id).then(data => {
        dispatch(followUserProfile());
        dispatch(ableButton());
    })
}

export const unfollowUser = (id) => (dispatch) => {
    dispatch(disableButton());
    usersApi.unfollow(id).then(data => {
        dispatch(unfollowUserProfile());
        dispatch(ableButton());
    })
}

export default profilePageReducer;