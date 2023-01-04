import React from 'react';
import { createSelector } from 'reselect';
import SinglePost from '../../components/Feed/SinglePost';
import { RootState } from '../redux-store';

const getPosts = (state: RootState) => state.postPage.posts;
const getProfileImg = (state: RootState) => state.profilePage.profile?.photos.small;
const getUserName = (state: RootState) => state.profilePage.profile.fullName;

export const postsSelector = createSelector(
    getPosts,
    getProfileImg,
    getUserName,
    (posts, profileImg, userName) =>
        posts.map((postData: any) => (
            <SinglePost
                postText={postData.postText}
                likesCount={postData.likesCount}
                profileImg={profileImg}
                userName={userName}
                key={postData.id}
            />
        ))
);
