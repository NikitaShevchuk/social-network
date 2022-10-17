import {ProfileActionsTypes} from "./actions";
import {ProfileInitialState} from "../../../types/ProfileTypes";
import {mapToContactsArray} from "./utilts";

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

    status: '',
    followed: false,
    isMyProfile: false,
    userIdParam: 0,
    contactsArray: [],

    localError: null,
    profileFetchError: null,

    photoIsUpdating: false,
    disableWhileRequest: false,
    profileIsLoading: true,

    profileEditMode: false,
    socialMediaEditMode: false
}

const profileReducer = (state = profileInitialState, action: ProfileActionsTypes): ProfileInitialState => {
    switch (action.type) {
        case 'profileReducer/SET_PROFILE':
            return {
                ...state,
                profile: action.profile,
                contactsArray: mapToContactsArray(action.profile.contacts)
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
        case 'profileReducer/UPD_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case 'profileReducer/PHOTO_UPDATING':
            return {
                ...state,
                photoIsUpdating: action.isUpdating
            }
        case 'profileReducer/UPDATE_PROFILE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    fullName: action.profile.fullName,
                    lookingForAJob: action.profile.lookingForAJob,
                    lookingForAJobDescription: action.profile.lookingForAJobDescription,
                    contacts: action.profile.contacts,
                    aboutMe: action.profile.aboutMe
                },
                contactsArray: mapToContactsArray(action.profile.contacts)
            }
        case 'profileReducer/ADD_LOCAL_ERROR':
            return {
                ...state,
                localError: action.localError
            }
        case 'profileReducer/SET_PROFILE_EDIT_MODE':
            return {
                ...state,
                profileEditMode: action.isInEditMode
            }
        case 'profileReducer/SET_IS_MY_PROFILE':
            return {
                ...state,
                isMyProfile: action.isMyProfile
            }
        case "profileReducer/SET_USER_ID":
            return {
                ...state,
                userIdParam: action.userId
            }
        case "profileReducer/ADD_PROFILE_FETCH_ERROR":
            return {
                ...state,
                profileFetchError: action.errorText
            }
        case "profileReducer/REMOVE_PROFILE_FETCH_ERROR":
            return {
                ...state,
                profileFetchError: null
            }
        case "profileReducer/SET_IS_PROFILE_LOADING":
            return {
                ...state,
                profileIsLoading: action.isLoading
            }
        case "profileReducer/SET_SOCIAL_MEDIA_EDIT_MODE":
            return {
                ...state,
                socialMediaEditMode: action.isInEditMode
            }
        default:
            return state;
    }
}

export default profileReducer;