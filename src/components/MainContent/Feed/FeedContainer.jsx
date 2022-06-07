import React from "react";
import Feed from "./Feed";
import {addPostActionCreator} from "../../redux/postPageReducer";
import {connect} from "react-redux";
import {postsSelector} from './postsReselector'

const mapStateToProps = state => {
    return {
        postList: postsSelector(state),
        profileImg: state.auth.profileImg
    }
}

const FeedContainer = connect(mapStateToProps, {addPostActionCreator})(Feed)

export default FeedContainer;