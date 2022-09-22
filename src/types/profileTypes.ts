import {Photos} from "./messagesTypes";

export interface Icontacts {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export interface Iprofile {
    aboutMe: string | null
    contacts: Icontacts
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string | undefined
    userId: number
    photos: Photos
}

export interface ProfileInitialState {
    profile: Iprofile
    disableWhileRequest: boolean
    followed: boolean
    status: string
    photoUpdating: boolean
    localError: string | null
}