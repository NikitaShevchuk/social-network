import React, {FC} from 'react';
import {RootState} from "../../../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import ProfileButtons from "./ProfileButtons";
import {setProfileEditMode} from "../../../../redux/reducers/profileReducer/actions";

const ProfileButtonsContainer: FC<ProfileButtonsConnectedProps> = ({
    setProfileEditMode, isMyProfile, userId, disableWhileRequest,
    followed, profileEditMode
}) => {
    const enterEditMode = () => setProfileEditMode(true)
    return (
        <ProfileButtons
            isMyProfile={isMyProfile}
            disableWhileRequest={disableWhileRequest}
            enterEditMode={enterEditMode}
            followed={followed}
            userId={userId}
            profileEditMode={profileEditMode}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    followed: state.profilePage.followed,
    disableWhileRequest: state.profilePage.disableWhileRequest,
    isMyProfile: state.profilePage.isMyProfile,
    userId: state.profilePage.userIdParam,
    profileEditMode: state.profilePage.profileEditMode
})

const connector = connect(
    mapStateToProps,
    {setProfileEditMode}
)
export default connector(ProfileButtonsContainer);
export type ProfileButtonsConnectedProps = ConnectedProps<typeof connector>