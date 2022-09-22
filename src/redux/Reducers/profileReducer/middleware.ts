import {profileApi, usersApi} from "../../../api/api";
import {profileActions} from "./actions";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../redux-store";
import {AnyAction} from 'redux'
import {updateProfileImg} from "../authReducer/middleware";

export const updStatusThunk = (status: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch) => {
        profileApi.updStatus(status).then( data => {
            if (data.resultCode === 0) dispatch(profileActions.updStatus(status))
        } ).catch(() => {
            dispatch(profileActions.addLocalError('Please login to edit your profile'))
            setTimeout(() => {
                dispatch(profileActions.addLocalError(''))
            }, 5000)
        })
}

export const loadProfile = (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        const data = await usersApi.isFollowing(id)
        if (data) {
            dispatch(profileActions.followUserProfile());
        } else {
            dispatch(profileActions.unfollowUserProfile());
        }
        const dataProfile = await profileApi.getProfile(id)
        dispatch(profileActions.setProfile(dataProfile))
        const dataStatus = await profileApi.getStatus(id)
        dispatch(profileActions.setStatus(dataStatus))
}

export const followUser = (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(profileActions.disableButton());
        usersApi.follow(id).then(() => {
            dispatch(profileActions.followUserProfile());
            dispatch(profileActions.ableButton());
        })
}

export const unfollowUser = (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(profileActions.disableButton());
        usersApi.unfollow(id).then(() => {
            dispatch(profileActions.unfollowUserProfile());
            dispatch(profileActions.ableButton());
        })
}

export const updatePhoto = (photo: File | null): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatch(profileActions.isPhotoUpdating(true))
        const response = await profileApi.uploadPhoto(photo);
        dispatch(profileActions.isPhotoUpdating(false))
        if (response.resultCode === 0) {
            dispatch(updateProfileImg(response.data.photos.large))
            return response.data.photos.small
        } else {
            dispatch(profileActions.addLocalError(response.messages[0]))
            setTimeout(() => {
                dispatch(profileActions.addLocalError(''))
            }, 5000)
        }
}

export const updateProfile = (formData: any): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        const profile = await profileApi.updateProfile(formData);
        if (profile.resultCode === 0) {
            dispatch(profileActions.setUpdatedProfile({...formData, contacts: {
                    github: formData.github,
                    vk: null,
                    facebook: formData.facebook,
                    instagram: formData.instagram,
                    twitter: formData.twitter,
                    website: null,
                    youtube: formData.youtube,
                    mainLink: null
                }}))
        } else {
            dispatch(profileActions.addLocalError(profile.messages[0]))
            setTimeout(() => {
                dispatch(profileActions.addLocalError(''))
            }, 5000)
        }
}