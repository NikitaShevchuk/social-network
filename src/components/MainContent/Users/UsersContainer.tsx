import React, {FC, useEffect, useRef, useState} from "react"
import Users from "./Users"
import {connect, ConnectedProps} from "react-redux"
import {
    getUsers, searchUsers, updUsersThunk
} from "../../../redux/Reducers/usersReducer/middleware"
import {usersActions} from '../../../redux/Reducers/usersReducer/actions'
import {RootState} from "../../../redux/redux-store"
import {
    getCurrentPage, getIsFetching, getPageSize,
    getTotalCount, usersSelector
} from "./usersSelector"
import {SearchDialogsFormValues} from "../Messages/Dialogs/DialogsSearchForm"

interface Props extends UsersConnectedProps {
    setSearchMode?: (searchMode: boolean) => void
    // if component used in 'new dialog' window
    getDialog?: (id: number) => void
}

const UsersPageAPI: FC<Props> = (props) => {
    const [pageCounter, setPageCounter] = useState(2)
    const searchIsEmpty = useRef<boolean>(true)
    const loadUsers = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        const notScrolled: boolean = target.scrollHeight - target.offsetHeight !== target.scrollTop
        const doNotLoadUsers = notScrolled || props.isFetching || !searchIsEmpty.current
        if (doNotLoadUsers) return
        props.updUsersThunk(pageCounter, props.pageSize)
        setPageCounter(pageCounter + 1)
    }
    const searchSubmit = (formData: SearchDialogsFormValues) => {
        searchIsEmpty.current = formData.searchBody === ''
        if (!searchIsEmpty.current) props.searchUsers(formData.searchBody)
        else props.getUsers(1, props.pageSize);
    }
    useEffect(() => {
        props.getUsers(1, props.pageSize)
    }, [])
    return (
        <Users
            {...props} key={55}
            loadUsers={loadUsers}
            searchSubmit={searchSubmit}
        />
    )
}

const mapStateToProps = (state: RootState) => ({
    users: usersSelector(state),
    pageSize: getPageSize(state),
    totalCount: getTotalCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state)
})

const connector = connect(
    mapStateToProps,
    {usersActions, getUsers, searchUsers, updUsersThunk}
)

const UsersContainer = connector(UsersPageAPI);
export default UsersContainer;
export type UsersConnectedProps = ConnectedProps<typeof connector>