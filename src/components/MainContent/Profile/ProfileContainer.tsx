import React, {FC} from 'react';
import Profile from "./Profile";
import {RootState} from "../../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import {
    followUser,
    loadProfile,
    unfollowUser,
    updatePhoto,
    updateProfile
} from "../../../redux/Reducers/profileReducer/middleware";
import {updateProfileImg} from "../../../redux/Reducers/authReducer/middleware";

const ProfileContainer: FC<ProfileProps> = (props) => {
    const onPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputFiles = e.target.files ? e.target.files[0] : null
        if (inputFiles) props.updatePhoto(inputFiles)
    }
    return (
        <Profile {...props} onPhotoUpload={onPhotoUpload} />
    );
};



let mapStateToProps = (state: RootState) => {
    return {
        profile: state.profilePage.profile,
        followed: state.profilePage.followed,
        disableWhileRequest: state.profilePage.disableWhileRequest,
        status: state.profilePage.status,
        myId: state.auth.userData.id,
        photoUpdating: state.profilePage.photoUpdating,
        localError: state.profilePage.localError
    }
}

const connector = connect(mapStateToProps, {
    followUser, unfollowUser, loadProfile,
    updatePhoto, updateProfile, updateProfileImg
})

export default connector(ProfileContainer);

export type ProfileProps = ConnectedProps<typeof connector>