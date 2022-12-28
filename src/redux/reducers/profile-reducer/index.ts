import { ProfileActionsTypes } from "./actions";
import { ProfileInitialState } from "../../../types/ProfileTypes";
import { mapToContactsArray } from "./utilts";

export const initialProfile = {
    photos: {
        small: null,
        large: null,
    },
    aboutMe: null,
    fullName: "",
    contacts: {
        github: null,
        facebook: null,
        youtube: null,
        instagram: null,
        mainLink: null,
        twitter: null,
        website: null,
        vk: null,
    },
    lookingForAJob: false,
    userId: 0,
    lookingForAJobDescription: "",
} as const;

export const profileInitialState: ProfileInitialState = {
    profile: initialProfile,
    status: "",
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
    socialMediaEditMode: false,
};

const profileReducer = (
    state = profileInitialState,
    action: ProfileActionsTypes
): ProfileInitialState => {
    switch (action.type) {
        case "profile-reducer/SET_PROFILE":
            return {
                ...state,
                profile: action.profile,
                contactsArray: mapToContactsArray(action.profile.contacts),
            };
        case "profile-reducer/SET_STATUS":
            return {
                ...state,
                status: action.status,
            };
        case "profile-reducer/FOLLOW_USER":
            return {
                ...state,
                followed: true,
            };
        case "profile-reducer/UNFOLLOW_USER":
            return {
                ...state,
                followed: false,
            };
        case "profile-reducer/ABLE_BUTTON":
            return {
                ...state,
                disableWhileRequest: false,
            };
        case "profile-reducer/DISABLE_BUTTON":
            return {
                ...state,
                disableWhileRequest: true,
            };
        case "profile-reducer/UPD_PHOTO":
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            };
        case "profile-reducer/PHOTO_UPDATING":
            return {
                ...state,
                photoIsUpdating: action.isUpdating,
            };
        case "profile-reducer/UPDATE_PROFILE":
            return {
                ...state,
                profile: { ...state.profile, ...action.profile },
                contactsArray: mapToContactsArray(action.profile.contacts),
            };
        case "profile-reducer/ADD_LOCAL_ERROR":
            return {
                ...state,
                localError: action.localError,
            };
        case "profile-reducer/SET_PROFILE_EDIT_MODE":
            return {
                ...state,
                profileEditMode: action.isInEditMode,
            };
        case "profile-reducer/SET_IS_MY_PROFILE":
            return {
                ...state,
                isMyProfile: action.isMyProfile,
            };
        case "profile-reducer/SET_USER_ID":
            return {
                ...state,
                userIdParam: action.userId,
            };
        case "profile-reducer/ADD_PROFILE_FETCH_ERROR":
            return {
                ...state,
                profileFetchError: action.errorText,
            };
        case "profile-reducer/REMOVE_PROFILE_FETCH_ERROR":
            return {
                ...state,
                profileFetchError: null,
            };
        case "profile-reducer/SET_IS_PROFILE_LOADING":
            return {
                ...state,
                profileIsLoading: action.isLoading,
            };
        case "profile-reducer/SET_SOCIAL_MEDIA_EDIT_MODE":
            return {
                ...state,
                socialMediaEditMode: action.isInEditMode,
            };
        default:
            return state;
    }
};

export default profileReducer;
