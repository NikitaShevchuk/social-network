import {ProfileActionsTypes} from "./actions";
import {ProfileInitialState} from "../../../types/profileTypes";

export const profileInitialState: ProfileInitialState = {
    profile: {
        photos: {
            small: null,
            large: null
        },
        aboutMe: null,
        fullName: '',
        contacts: {
            github: null,
            facebook: null,
            youtube: null,
            instagram: null,
            mainLink: null,
            twitter: null,
            website: null,
            vk: null
        },
        lookingForAJob: false,
        userId: 0,
        lookingForAJobDescription: ''
    },
    disableWhileRequest: false,
    followed: false,
    status: '',
    photoUpdating: false,
    localError: null
}

const profileReducer = (state = profileInitialState, action: ProfileActionsTypes): ProfileInitialState => {
    switch (action.type) {
        case 'profileReducer/SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profileReducer/FOLLOW_USER':
            return {
                ...state,
                followed: true
            }
        case 'profileReducer/UNFOLLOW_USER':
            return {
                ...state,
                followed: false
            }
        case 'profileReducer/ABLE_BUTTON':
            return {
                ...state,
                disableWhileRequest: false
            }
        case 'profileReducer/DISABLE_BUTTON':
            return {
                ...state,
                disableWhileRequest: true
            }
        case 'profileReducer/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profileReducer/UPD_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profileReducer/UPD_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case 'profileReducer/PHOTO_UPDATING':
            return {
                ...state,
                photoUpdating: action.isUpdating
            }
        case 'profileReducer/UPDATE_PROFILE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fullName: action.profile.fullName,
                    lookingForAJob: action.profile.lookingForAJob,
                    lookingForAJobDescription: action.profile.lookingForAJobDescription
                }
            }
        case 'profileReducer/ADD_LOCAL_ERROR':
            return {
                ...state,
                localError: action.localError
            }
        default:
            return state;
    }
}

export default profileReducer;