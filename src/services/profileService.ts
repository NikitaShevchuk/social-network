import {EditProfilePutRequestData, Profile} from "../types/ProfileTypes";
import {defaultInstance, DefaultResponse, Response} from "./index";
import {UserData} from "../types/AuthTypes";
import {FormValues} from "../components/Login/LoginContainer";
import {Photos} from "../types/Photos";


export interface LoginResponse extends Response { data: UserData }
export interface PhotosResponse extends Response { data: { photos: Photos } }

export const profileService = {
    async getProfile(id: number) {
        const response = await defaultInstance.get(`profile/${id}`)
        return response.data as Promise<Profile>
    },
    async getStatus(id: number) {
        const response = await defaultInstance.get(`profile/status/${id}`)
        return response.data as Promise<string>
    },
    async updStatus(status: string) {
        const response = await defaultInstance.put(`profile/status`, {status})
        return response.data as Promise<DefaultResponse>
    },
    async auth() {
        const response = await defaultInstance.get(`auth/me`)
        return response.data as Promise<LoginResponse>
    },
    async login(formData: FormValues) {
        const response = await defaultInstance.post('auth/login', formData)
        return response.data as Promise<LoginResponse>
    },
    async logout() {
        const response = await defaultInstance.delete('auth/login')
        return response.data as Promise<DefaultResponse>
    },
    async uploadPhoto(photo: File | null) {
        const formData = new FormData();
        if (photo) formData.append("image", photo);
        const response = await defaultInstance.put(
            `profile/photo`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        return response.data as Promise<PhotosResponse>
    },
    async updateProfile(formData: EditProfilePutRequestData) {
        const response = await defaultInstance.put(`profile`, formData)
        return response.data as Promise<DefaultResponse>
    }
}