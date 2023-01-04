import { Photos } from './Photos';

export interface User {
    name: string;
    id: number;
    uniqueName: null | string;
    photos: Photos;
    status: null | string;
    followed: boolean;
}
export interface IinitialState {
    users: User[];
    pageSize: number;
    totalCount: number;
    currentPage: number;
    isFetching: boolean;
    isLoading: boolean;
    disableWhileRequest: number[];
    usersError: string | null;
}
