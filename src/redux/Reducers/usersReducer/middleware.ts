import {DefaultResponse, ResultCodes, usersApi} from "../../../api/api";
import {usersActions} from "./actions";
import {RootState} from "../../redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch, ReducerAction} from "react";
import {AnyAction} from "redux";

type AsyncThunkType = ThunkAction<Promise<void>, RootState, any, AnyAction>

export const getUsers = (currentPage: number, pageSize: number): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.isFetchingFunc(true))
    const data = await usersApi.getUsers(currentPage, pageSize)
    dispatch(usersActions.isFetchingFunc(false));
    dispatch(usersActions.setUsers(data.items));
}
export const updUsersThunk = (currentPage: number, pageSize: number): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.isFetchingFunc(true))
    const data = await usersApi.getUsers(currentPage, pageSize)
    dispatch(usersActions.isFetchingFunc(false));
    dispatch(usersActions.updUsers(data.items));
}

export const searchUsers = (term: string): AsyncThunkType => async (dispatch) => {
    dispatch(usersActions.isFetchingFunc(true))
    const usersResponse = await usersApi.searchUsers(term)
    dispatch(usersActions.isFetchingFunc(false));
    dispatch(usersActions.setUsers(usersResponse.items));
}

const _followUnfollowFlow = async (
    id: number,
    dispatch: Dispatch<any>,
    actionCreator: (id: number) => ReducerAction<any>,
    apiMethod: (id: number) => Promise<DefaultResponse>
) => {
    dispatch(usersActions.disableButton(id));
    const followResponse = await apiMethod(id)
    if (followResponse.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(id));
    } else {
        console.log(followResponse.messages)
    }
    dispatch(usersActions.ableButton(id));
}

export const followUser = (id: number): AsyncThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        id, dispatch, usersActions.followSuccessful, usersApi.follow
    )
}

export const unfollowUser = (id: number): AsyncThunkType => async (dispatch) => {
    await _followUnfollowFlow(
        id, dispatch, usersActions.unfollowSuccessful, usersApi.unfollow
    )
}