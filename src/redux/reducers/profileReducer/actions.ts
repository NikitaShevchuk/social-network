import {EditProfilePutRequestData, Profile} from "../../../types/ProfileTypes";
import {InferActionsTypes} from "../../redux-store";
import {Photos} from "../../../types/Photos";

export const profileActions = {
    ableButton: () => ({type: 'profileReducer/ABLE_BUTTON'} as const),
    disableButton: () => ({type: 'profileReducer/DISABLE_BUTTON'} as const),
    followUserProfile: () => ({type: 'profileReducer/FOLLOW_USER'} as const),
    unfollowUserProfile: () => ({type: 'profileReducer/UNFOLLOW_USER'} as const),
    isPhotoUpdating: (isUpdating: boolean) => ({type: 'profileReducer/PHOTO_UPDATING', isUpdating} as const),
    setProfileEditMode: (isInEditMode: boolean) => ({type: 'profileReducer/SET_PROFILE_EDIT_MODE', isInEditMode} as const),
    setSocialMediaEditMode: (isInEditMode: boolean) => ({type: 'profileReducer/SET_SOCIAL_MEDIA_EDIT_MODE', isInEditMode} as const),

    // Load profile
    photoUploadedSuccessfully: (photos: Photos) => ({type: 'profileReducer/UPD_PHOTO', photos} as const),
    setUpdatedProfile: (profile: EditProfilePutRequestData) => ({type: 'profileReducer/UPDATE_PROFILE', profile} as const),
    setIsProfileLoading: (isLoading: boolean) => ({type: 'profileReducer/SET_IS_PROFILE_LOADING', isLoading} as const),
    setProfile: (profile: Profile) => ({type: 'profileReducer/SET_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profileReducer/SET_STATUS', status} as const),
    setUserId: (userId: number) => ({type: 'profileReducer/SET_USER_ID', userId} as const),
    setIsMyProfile: (isMyProfile: boolean) => ({type: 'profileReducer/SET_IS_MY_PROFILE', isMyProfile} as const),

    // Errors handles
    addLocalError: (localError: string) => ({type: 'profileReducer/ADD_LOCAL_ERROR', localError} as const),
    addProfileFetchError: (errorText: string) => ({type: 'profileReducer/ADD_PROFILE_FETCH_ERROR', errorText} as const),
    removeProfileFetchError: () => ({type: 'profileReducer/REMOVE_PROFILE_FETCH_ERROR'} as const)
}

export const {
    setProfileEditMode, setUpdatedProfile, followUserProfile, unfollowUserProfile, setUserId, setIsMyProfile,
    addLocalError, photoUploadedSuccessfully, isPhotoUpdating, disableButton, ableButton, setStatus, setProfile,
    addProfileFetchError, setIsProfileLoading, removeProfileFetchError, setSocialMediaEditMode
} = profileActions

export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>