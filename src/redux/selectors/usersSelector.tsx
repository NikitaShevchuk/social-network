import {createSelector} from "reselect";
import React from "react";
import SingleUser from "../../features/Users/SingleUser";
import {RootState} from "../redux-store";
import {User} from "../../types/UsersTypes";

export const getPageSize = (state: RootState) => state.usersPage.pageSize
export const getTotalCount = (state: RootState) => state.usersPage.totalCount
export const getCurrentPage = (state: RootState) => state.usersPage.currentPage
export const getIsFetching = (state: RootState) => state.usersPage.isFetching

const getUsers = (state: RootState) => state.usersPage.users
const getDisableWhileRequest = (state: RootState) => state.usersPage.disableWhileRequest

export const usersSelector = createSelector([getUsers, getDisableWhileRequest], (users, disabledButtons) => {
    return users.map((user: User) => (
            <SingleUser
                user={user}
                disableWhileRequest={disabledButtons}
                key={user.id}
            />
        )
    )
})