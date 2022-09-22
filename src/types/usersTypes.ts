import { Photos } from "./messagesTypes";

export interface Iuser {
    name: string
    id: number
    uniqueName: null | string
    photos: Photos
    status: null | string
    followed: boolean
}
export interface IinitialState {
    users: [] | Iuser[] // todo - add null as type to users initial state interface
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    disableWhileRequest: number[]
}