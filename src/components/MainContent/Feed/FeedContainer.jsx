import React from "react";
import SinglePost from "./SinglePost";
import Feed from "./Feed";
import {addPostActionCreator, changeTextActionCreator} from "../../redux/postPageReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        postList: state.postPage.posts.map( postData => <SinglePost postText={postData.postText} likesCount={postData.likesCount} key={postData.id}/> )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onPostChange(text) {
            let action = changeTextActionCreator(text);
            dispatch(action)
        },
        addPostAction() {
            let action = addPostActionCreator();
            dispatch(action)
        }
    }
}

const FeedContainer = connect(mapStateToProps, mapDispatchToProps)(Feed)

export default FeedContainer;