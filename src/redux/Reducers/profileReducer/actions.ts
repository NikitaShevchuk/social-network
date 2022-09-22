import {Iprofile} from "../../../types/profileTypes";
import {Photos} from "../../../types/messagesTypes";
import {InferActionsTypes} from "../../redux-store";

export const profileActions = {
    setProfile: (profile: Iprofile) => ({type: 'profileReducer/SET_PROFILE', profile} as const),
    followUserProfile: () => ({type: 'profileReducer/FOLLOW_USER'} as const),
    unfollowUserProfile: () => ({type: 'profileReducer/UNFOLLOW_USER'} as const),
    disableButton: () => ({type: 'profileReducer/DISABLE_BUTTON'} as const),
    ableButton: () => ({type: 'profileReducer/ABLE_BUTTON'} as const),
    setStatus: (status: string) => ({type: 'profileReducer/SET_STATUS', status} as const),
    updStatus: (status: string) => ({type: 'profileReducer/UPD_STATUS', status} as const),
    photoUploadedSuccessfully: (photos: Photos) => ({type: 'profileReducer/UPD_PHOTO', photos} as const),
    isPhotoUpdating: (isUpdating: boolean) => ({type: 'profileReducer/PHOTO_UPDATING', isUpdating} as const),
    setUpdatedProfile: (profile: Iprofile) => ({type: 'profileReducer/UPDATE_PROFILE', profile} as const),
    addLocalError: (localError: string) => ({type: 'profileReducer/ADD_LOCAL_ERROR', localError} as const),
}

export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>