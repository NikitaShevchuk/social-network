import {Photos} from "./Photos";

export interface Contacts {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export interface Profile {
    aboutMe: string | null
    contacts: Contacts
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
    userId: number
    photos: Photos
}

export type ContactsArray = Array<[SocialMediaName, string | null]>
export interface ProfileInitialState {
    profile: Profile
    disableWhileRequest: boolean
    followed: boolean
    status: string | null
    photoIsUpdating: boolean
    localError: string | null
    profileEditMode: boolean
    userIdParam: number
    isMyProfile: boolean
    profileFetchError: string | null
    profileIsLoading: boolean
    socialMediaEditMode: boolean
    contactsArray: ContactsArray
}

export interface EditProfileFormValues {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
}

export interface EditProfilePutRequestData {
    contacts: Contacts
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
}

export type SocialMediaName = 'facebook' | 'website' | 'vk' | 'twitter' | 'instagram' | 'youtube' | 'github' | 'mainLink'