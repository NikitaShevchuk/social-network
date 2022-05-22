import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {
    changePage,
    followUser, getUsers, unfollowUser
} from "../../redux/UsersPageReducer";

class UsersPageAPI extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onChangeCurrentPage = (newCurrentPage) => {
        this.props.changePage(newCurrentPage)
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    followUserEvent = (id) => {
        this.props.followUser(id);
    }
    unfollowUserEvent = (id) => {
        this.props.unfollowUser(id);
    }

    render() {
        return <Users {...this.props}
                      onChangeCurrentPage={this.onChangeCurrentPage}
                      followUserEvent={this.followUserEvent}
                      unfollowUserEvent={this.unfollowUserEvent}
                      key={55} />
    }
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

const UsersContainer = connect(mapStateToProps, {followUser, unfollowUser, changePage, getUsers})(UsersPageAPI);

export default UsersContainer;