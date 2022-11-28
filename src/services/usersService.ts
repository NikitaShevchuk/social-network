import {profileService} from "./profileService";
import {defaultInstance, DefaultResponse, Response} from "./index";
import {User} from "../types/UsersTypes";

interface GetUsersResponse extends Response {
    items: User[]
    totalCount: number
}

export const usersService = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await defaultInstance.get(`users?page=${currentPage}&count=${pageSize}`)
        return response.data as GetUsersResponse
    },
    async searchUsers(term: string) {
        const response = await defaultInstance.get(`users?term=${term}`)
        return response.data as GetUsersResponse
    },
    async follow(id: number) {
        const response = await defaultInstance.post(`follow/${id}`)
        return response.data as DefaultResponse
    },
    async unfollow(id: number) {
        const response = await defaultInstance.delete(`follow/${id}`)
        return response.data as DefaultResponse
    },
    async isFollowing(id: number) {
        const response = await defaultInstance.get(`follow/${id}`)
        return response.data as boolean
    }
}