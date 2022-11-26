import React, {FC, useEffect, useRef, useState} from "react"
import Users from "./Users"
import {connect, ConnectedProps} from "react-redux"
import {fetchUsers, getUsers, searchUsers} from "../../redux/reducers/users-reducer/middleware"
import {RootState} from "../../redux/redux-store"
import {
    getCurrentPage, getIsFetching, getPageSize,
    getTotalCount, usersSelector
} from "../../redux/selectors/usersSelector"
import {SearchDialogsFormValues} from "../../components/MainContent/Messages/Dialogs/DialogsSearchForm"
import {isElementScrolledToBottom} from "../../common/helpers/isElementScrolledToBottom";

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
        const scrolledToBottom: boolean = isElementScrolledToBottom(target)
        const doNotLoadUsers = !scrolledToBottom || props.isFetching || !searchIsEmpty.current
        if (doNotLoadUsers) return
        props.fetchUsers(pageCounter, props.pageSize)
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
            {...props}
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
    isFetching: getIsFetching(state),
    usersError: state.usersPage.usersError,
    isLoading: state.usersPage.isLoading
})

const connector = connect(
    mapStateToProps,
    {getUsers, searchUsers, fetchUsers}
)

const UsersContainer = connector(UsersPageAPI);
export default UsersContainer;
export type UsersConnectedProps = ConnectedProps<typeof connector>