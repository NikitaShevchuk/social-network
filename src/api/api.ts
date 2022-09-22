import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {Iprofile} from "../types/profileTypes";
import {UserData} from "../types/authTypes";
import {Iuser} from "../types/usersTypes";
import {Idialog, Imessage, Photos} from "../types/messagesTypes";

const API_SERVER_URL = 'https://social-network.samuraijs.com/api/1.0/'
const API_KEY = localStorage.getItem('apiKey')
const getApiKey = () => API_KEY ? API_KEY : 0 // there's no other ways to save api-key :(

const config: AxiosRequestConfig = {
    baseURL: API_SERVER_URL,
    withCredentials: true,
    headers: {
        "API-KEY": getApiKey()
    }
}
const defaultInstance: AxiosInstance = axios.create(config)

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaError = 10
}
interface Response {
    resultCode: ResultCodes
    messages: string[] | [] // empty if resultCode === 0 (Success)
}
export interface DefaultResponse extends Response {
    data: {} | { userId: number }
}
interface GetMethodResponse extends Response {
    data: UserData
}
interface PhotosResponse extends Response {
    data: {
        photos: Photos
    }
}


export const profileApi = {
    getProfile(id: number) {
        return defaultInstance.get(`profile/${id}`).then<Iprofile>(response => response.data)
    },
    getStatus(id: number) {
        return defaultInstance.get(`profile/status/${id}`).then<string>(response => response.data)
    },
    updStatus(status: string) {
        return defaultInstance.put(`profile/status`, {status}).then<DefaultResponse>(response => response.data)
    },
    auth() {
        return defaultInstance.get(`auth/me`).then<GetMethodResponse>(response => response.data)
    },
    login(formData: any) {
        return defaultInstance.post('auth/login', formData).then<GetMethodResponse>(response => response.data)
    },
    logout() {
        return defaultInstance.delete('auth/login').then<DefaultResponse>(response => response.data)
    },
    uploadPhoto(photo: any) {
        let formData = new FormData();
        formData.append("image", photo);
        return defaultInstance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then<PhotosResponse>(response => response.data)
    },
    updateProfile(formData: any) {
        return defaultInstance.put(`profile`, formData).then<DefaultResponse>(response => response.data)
    }
}

type getUsersResponse = {
    items: Iuser[]
    totalCount: number
}

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return defaultInstance.get(`users?page=${currentPage}&count=${pageSize}`).then<getUsersResponse>(response => response.data)
    },
    searchUsers(term: string) {
        return defaultInstance.get(`users?term=${term}`).then<getUsersResponse>(response => response.data)
    },
    follow(id: number) {
        return defaultInstance.post(`follow/${id}`).then<DefaultResponse>(response => response.data)
    },
    unfollow(id: number) {
        return defaultInstance.delete(`follow/${id}`).then<DefaultResponse>(response => response.data)
    },
    auth() {
        console.warn('Use profileApi object')
        return profileApi.auth();
    },
    isFollowing(id: number) {
        return defaultInstance.get(`follow/${id}`).then<boolean>(response => response.data)
    }
}

type MessagesResponse = {
    items: Imessage[]
}
type DialogsResponse = {
    items: Idialog[]
}

export const dialogsApi = {
    startDialog(id: number) {
        return defaultInstance.put<{ data: Idialog }>(`dialogs/${id}`).then(response => response.data)
    },
    sendMessage(id: number, body: string) {
        return defaultInstance.post<DefaultResponse>(`dialogs/${id}/messages`, body).then(response => response.data)
    },
    requireMessages(id: number, date: string = '2022-05-19') {
        return defaultInstance.get<Imessage[]>(`dialogs/${id}/messages/new?newerThen=${date}`).then(response => response.data)
    },
    requireDialogs() {
        return defaultInstance.get<Idialog[]>(`dialogs`).then(response => response.data)
    },
    requireLastMessage(id: number) {
        return defaultInstance.get<MessagesResponse>(`dialogs/${id}/messages?page=1&count=1`).then(response => response.data)
    }
}
export const securityApi = {
    requireCaptcha() {
        return defaultInstance.get<{url: string}>(`security/get-captcha-url`).then(response => response.data)
    }
}
export const modifyHeaders = () => {
    // temporary solution
    // @ts-ignore
    defaultInstance.defaults.headers.common['API-KEY'] = getApiKey();
}
