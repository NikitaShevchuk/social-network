import {createSelector} from "reselect";
import SinglePost from "./SinglePost";

const getPosts = state => state.postPage.posts
const getProfileImg = state => state.profilePage.profile?.photos.small
const getUserName= state => state.profilePage.profile.fullName

export const postsSelector = createSelector(getPosts, getProfileImg, getUserName, (posts, profileImg, userName) => {
    return posts.map( postData => <SinglePost postText={postData.postText}
                                              likesCount={postData.likesCount}
                                              profileImg={profileImg}
                                              userName={userName}
                                              key={postData.id}/> )
})