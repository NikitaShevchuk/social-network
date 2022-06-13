import React, {useEffect, useState} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    changePage,
    followUser, getUsers, searchUsers, unfollowUser, updUsers, updUsersThunk
} from "../../redux/UsersPageReducer";

const UsersPageAPI = (props) => {
    let [pageCounter, setPageCounter] = useState(2)
    const loadUsers = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight !== e.currentTarget.scrollTop || props.isFetching) return;
        props.updUsersThunk(pageCounter, props.pageSize)
        setPageCounter( pageCounter + 1 )
    }
    const followUserEvent = (id) => {
        props.followUser(id);
    }
    const unfollowUserEvent = (id) => {
        props.unfollowUser(id);
    }
    const searchSubmit = (formData) => {
        formData.searchBody !== '' ? props.searchUsers(formData.searchBody) : props.getUsers(1, props.pageSize);
    }
    useEffect(() => {
        props.getUsers(1, props.pageSize)
    }, [])
    return <Users {...props} key={55} loadUsers={loadUsers}
                  followUserEvent={followUserEvent}
                  unfollowUserEvent={unfollowUserEvent}
                  searchSubmit={searchSubmit}
                  startDialog={props.startDialog}
    />
}

const mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        disableWhileRequest: state.usersPage.disableWhileRequest
    }
}

const UsersContainer = connect(mapStateToProps, {followUser, unfollowUser, changePage, getUsers, searchUsers, updUsersThunk})(UsersPageAPI);

export default UsersContainer;