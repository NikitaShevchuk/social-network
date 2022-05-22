import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {followUser, loadProfile, unfollowUser, updStatusThunk} from "../../redux/ProfilePageReducer";
import {compose} from "redux";
import withRedirect from "../../HOC/withRedirect";


const ProfileContainer = (props) => {
    return <Profile {...props} />
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        followed: state.profilePage.followed,
        disableWhileRequest: state.profilePage.disableWhileRequest,
        status: state.profilePage.status,
        myId: state.auth.userData.id
    }
}

export default compose(
    withRedirect,
    connect(mapStateToProps, {followUser, unfollowUser, loadProfile, updStatusThunk})
)(ProfileContainer);