import {ResultCodes} from "../../../services";
import {profileActions} from "./actions";
import {authActions} from "../auth-reducer/actions";
import {profileService} from "../../../services/profileService";
import {usersService} from "../../../services/usersService";
import {AsyncThunk} from "../../Models";
import {appActions} from "../app-reducer/actions";
import {EditProfilePutRequestData} from "../../../types/ProfileTypes";


export const loadProfile = (id: number): AsyncThunk => async (dispatch) => {
    dispatch(profileActions.setIsProfileLoading(true))
    try {
        const isFollowing = await usersService.isFollowing(id)
        if (isFollowing) dispatch(profileActions.followUserProfile());
        else dispatch(profileActions.unfollowUserProfile());
        const profileData = await profileService.getProfile(id)
        dispatch(profileActions.setProfile(profileData))
        const status = await profileService.getStatus(id)
        dispatch(profileActions.setStatus(status))
        dispatch(profileActions.removeProfileFetchError())
    } catch {
        dispatch(profileActions.addProfileFetchError("Can't load profile"))
    }
    dispatch(profileActions.setIsProfileLoading(false))
}


export const getMyProfileFromState = (): AsyncThunk => (dispatch, getState) => {
    dispatch(profileActions.setIsProfileLoading(true))
    const myProfileFromState = getState().auth.clientProfile
    if (myProfileFromState.userId !== 0) dispatch(profileActions.setProfile(myProfileFromState))
    dispatch(profileActions.setIsProfileLoading(false))
}


export const followUser = (id: number): AsyncThunk => async (dispatch) => {
    dispatch(profileActions.disableButton())
    try {
        const response = await usersService.follow(id)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(profileActions.followUserProfile())
            dispatch(profileActions.ableButton())
        } else if (response.resultCode === ResultCodes.Error) {
            dispatch(appActions.addError(response.messages[0]))
        }
    } catch {
        dispatch(appActions.addError('Network error'))
    }
    dispatch(profileActions.ableButton())
}


export const unfollowUser = (id: number): AsyncThunk => async (dispatch) => {
    try {
        dispatch(profileActions.disableButton());
        const response = await usersService.unfollow(id)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(profileActions.unfollowUserProfile());
            dispatch(profileActions.ableButton());
        } else if (response.resultCode === ResultCodes.Error) {
            dispatch(appActions.addError(response.messages[0]))
        }
    } catch {
        dispatch(appActions.addError('Network error'))
    }
}


export const updatePhoto = (photo: File | null): AsyncThunk => async (dispatch) => {
    dispatch(profileActions.isPhotoUpdating(true))
    try {
        const response = await profileService.uploadPhoto(photo);
        if (response.resultCode === ResultCodes.Success) {
            dispatch(authActions.setUserPhoto(response.data.photos.large))
            dispatch(profileActions.photoUploadedSuccessfully(response.data.photos))
        } else {
            dispatch(profileActions.addLocalError(response.messages[0]))
            setTimeout(() => {
                dispatch(profileActions.addLocalError(''))
            }, 5000)
        }
    } catch {
        dispatch(appActions.addError('Network error'))
    }
    dispatch(profileActions.isPhotoUpdating(false))
}


export const updateProfile = (updatedProfile: EditProfilePutRequestData): AsyncThunk => async (dispatch) => {
    try {
        const profile = await profileService.updateProfile(updatedProfile);
        if (profile.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setUpdatedProfile(updatedProfile))
        } else if (profile.resultCode === ResultCodes.Error) {
            dispatch(profileActions.addLocalError(profile.messages[0]))
            setTimeout(() => {
                dispatch(profileActions.addLocalError(''))
            }, 5000)
        }
    } catch {
        dispatch(appActions.addError('Network error'))
    }
}