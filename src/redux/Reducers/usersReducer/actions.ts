import {Iuser} from "../../../types/usersTypes";
import {InferActionsTypes} from "../../redux-store";

export const usersActions = {
    updUsers: (newUsers: Iuser[]) => ({type: 'usersReducer/UPD_USERS', newUsers } as const),
    setUsers: (users: Iuser[]) => ({type: 'usersReducer/SET_USERS', users } as const),
    followSuccessful: (id: number) => ({type: 'usersReducer/FOLLOW_USER', id} as const),
    unfollowSuccessful: (id: number) => ({type: 'usersReducer/UNFOLLOW_USER', id} as const),
    changePage: (newCurrentPage: number) => ({type: 'usersReducer/CHANGE_PAGE', newCurrentPage} as const),
    isFetchingFunc: (isFetching: boolean) => ({type: 'usersReducer/IS_FETCHING', isFetching} as const),
    disableButton: (id: number) => ({type: 'usersReducer/DISABLE_BUTTON', id} as const),
    ableButton: (id: number) => ({type: 'usersReducer/ABLE_BUTTON', id} as const),
}

export type UsersActionsTypes = InferActionsTypes<typeof usersActions>