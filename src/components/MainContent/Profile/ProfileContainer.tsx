import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import { RootState } from '../../../redux/redux-store';
import {
    getMyProfileFromState,
    loadProfile
} from '../../../redux/reducers/profile-reducer/middleware';
import { setIsMyProfile, setUserId } from '../../../redux/reducers/profile-reducer/actions';

const ProfileContainer: FC<ProfileProps> = (props) => {
    const id = useParams().userId;
    useEffect(() => {
        // make sure that the userId won't be undefined
        const userIdForState = id ? Number(id) : props.myId;
        props.setUserId(userIdForState);
        const isMyProfile = userIdForState === props.myId || userIdForState === 0;
        if (isMyProfile) {
            props.setIsMyProfile(true);
            props.getMyProfileFromState();
        } else {
            props.setIsMyProfile(false);
            props.loadProfile(userIdForState);
        }
    }, [id, props.myId]);
    return <Profile {...props} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
    myId: state.auth.userData.id,
    localError: state.profilePage.localError,
    isMyProfile: state.profilePage.isMyProfile,
    profileEditMode: state.profilePage.profileEditMode,
    userId: state.profilePage.userIdParam,
    profileFetchError: state.profilePage.profileFetchError,
    profileIsLoading: state.profilePage.profileIsLoading
});

const connector = connect(mapStateToProps, {
    loadProfile,
    setIsMyProfile,
    setUserId,
    getMyProfileFromState
});

export default connector(ProfileContainer);

export type ProfileProps = ConnectedProps<typeof connector>;
