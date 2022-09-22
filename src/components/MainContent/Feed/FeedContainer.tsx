import React from "react";
import Feed from "./Feed";
import {addPostActionCreator} from "../../../redux/Reducers/postPageReducer";
import {connect} from "react-redux";
import {postsSelector} from '../../../redux/selectors/postsReselector'
import {RootState} from "../../../redux/redux-store";

const mapStateToProps = (state: RootState) => {
    return {
        postList: postsSelector(state),
        profileImg: state.auth.profileImg
    }
}

const FeedContainer = connect(mapStateToProps, {addPostActionCreator})(Feed)

export default FeedContainer;