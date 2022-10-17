import {DefaultResponse, ResultCodes} from "../../../services";
import {usersActions} from "./actions";
import {RootState} from "../../redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch, ReducerAction} from "react";
import {AnyAction} from "redux";
import {usersService} from "../../../services/usersService";
import {appActions} from "../appReducer/actions";

type AsyncThunkType = ThunkAction<Promise<void>, RootState, any, AnyAction>

export const getUsers = (currentPage: number, pageSize: number): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.setIsLoading(true))
    try {
        const data = await usersService.getUsers(currentPage, pageSize)
        dispatch(usersActions.clearUsersError())
        dispatch(usersActions.setUsers(data.items));
    } catch {
        usersActions.addUsersError("Can't load users")
    }
    dispatch(usersActions.setIsLoading(false));
}
export const fetchUsers = (currentPage: number, pageSize: number): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.isFetchingFunc(true))
    try {
        const updatedUsers = await usersService.getUsers(currentPage, pageSize)
        dispatch(usersActions.updUsers(updatedUsers.items))
    } catch {
        dispatch(appActions.addError("Can't load users"))
    }
    dispatch(usersActions.isFetchingFunc(false))
}
export const searchUsers = (term: string): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.isFetchingFunc(true))
    try {
        const usersResponse = await usersService.searchUsers(term)
        dispatch(usersActions.setUsers(usersResponse.items));
    } catch {
        dispatch(usersActions.addUsersError("Can't load users"))
    }
    dispatch(usersActions.isFetchingFunc(false));
}

const _followUnfollowFlow = async (
    id: number,
    dispatch: Dispatch<any>,
    actionCreator: (id: number) => ReducerAction<any>,
    apiMethod: (id: number) => Promise<DefaultResponse>
) => {
    dispatch(usersActions.disableButton(id));
    try {
        const followResponse = await apiMethod(id)
        if (followResponse.resultCode === ResultCodes.Success) {
            dispatch(actionCreator(id));
        } else {
            dispatch(appActions.addError(followResponse.messages[0]))
        }
    } catch {
        appActions.addError("Can't follow this user")
    }
    dispatch(usersActions.ableButton(id));
}

export const followUser = (id: number): AsyncThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        id, dispatch, usersActions.followSuccessful, usersService.follow
    )
}

export const unfollowUser = (id: number): AsyncThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        id, dispatch, usersActions.unfollowSuccessful, usersService.unfollow
    )
}