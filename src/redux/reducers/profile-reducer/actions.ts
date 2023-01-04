import { EditProfilePutRequestData, Profile } from '../../../types/ProfileTypes';
import { InferActionsTypes } from '../../redux-store';
import { Photos } from '../../../types/Photos';

export const profileActions = {
    ableButton: () => ({ type: 'profile-reducer/ABLE_BUTTON' } as const),
    disableButton: () => ({ type: 'profile-reducer/DISABLE_BUTTON' } as const),
    followUserProfile: () => ({ type: 'profile-reducer/FOLLOW_USER' } as const),
    unfollowUserProfile: () => ({ type: 'profile-reducer/UNFOLLOW_USER' } as const),
    isPhotoUpdating: (isUpdating: boolean) =>
        ({ type: 'profile-reducer/PHOTO_UPDATING', isUpdating } as const),
    setProfileEditMode: (isInEditMode: boolean) =>
        ({ type: 'profile-reducer/SET_PROFILE_EDIT_MODE', isInEditMode } as const),
    setSocialMediaEditMode: (isInEditMode: boolean) =>
        ({ type: 'profile-reducer/SET_SOCIAL_MEDIA_EDIT_MODE', isInEditMode } as const),

    // Load profile
    photoUploadedSuccessfully: (photos: Photos) =>
        ({ type: 'profile-reducer/UPD_PHOTO', photos } as const),
    setUpdatedProfile: (profile: EditProfilePutRequestData) =>
        ({ type: 'profile-reducer/UPDATE_PROFILE', profile } as const),
    setIsProfileLoading: (isLoading: boolean) =>
        ({ type: 'profile-reducer/SET_IS_PROFILE_LOADING', isLoading } as const),
    setProfile: (profile: Profile) => ({ type: 'profile-reducer/SET_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'profile-reducer/SET_STATUS', status } as const),
    setUserId: (userId: number) => ({ type: 'profile-reducer/SET_USER_ID', userId } as const),
    setIsMyProfile: (isMyProfile: boolean) =>
        ({ type: 'profile-reducer/SET_IS_MY_PROFILE', isMyProfile } as const),

    // Errors handles
    addLocalError: (localError: string) =>
        ({ type: 'profile-reducer/ADD_LOCAL_ERROR', localError } as const),
    addProfileFetchError: (errorText: string) =>
        ({ type: 'profile-reducer/ADD_PROFILE_FETCH_ERROR', errorText } as const),
    removeProfileFetchError: () => ({ type: 'profile-reducer/REMOVE_PROFILE_FETCH_ERROR' } as const)
};

export const { setProfileEditMode, setUserId, setIsMyProfile, setSocialMediaEditMode } =
    profileActions;

export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>;
