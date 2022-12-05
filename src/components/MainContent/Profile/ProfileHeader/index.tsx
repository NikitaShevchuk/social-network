import React, {FC} from 'react';
import style from "../Profile.module.scss";
import Preloader from "../../../../preloaders/Preloader";
import UserPhoto from "../../../../common/UserPhoto";
import EditProfilePhoto from "../EditProfile/EditProfilePhoto";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../../../redux/redux-store";
import {updatePhoto} from "../../../../redux/reducers/profile-reducer/middleware";
import ProfileButtonsContainer from "./ProfileButtonsContainer";

interface Props extends ProfileHeaderConnectedProps {
    profileLargePhoto: string | null
}

const ProfileHeader: FC<Props> = ({
    profileLargePhoto, photoIsUpdating, isMyProfile, updatePhoto
}) => {
    const figureClassName = profileLargePhoto && !photoIsUpdating ? style.transparent : style.whiteBg
    const onPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.target.files ? e.target.files[0] : null
        if (inputFiles) updatePhoto(inputFiles)
    }
    return (
        <div className={style.profileHeader}>
            <div className={style.userAvatar}>
                <figure className={figureClassName}>
                    {photoIsUpdating
                        ? <Preloader/>
                        : <UserPhoto profileImg={profileLargePhoto}/>
                    }
                    {isMyProfile &&
                        <EditProfilePhoto onPhotoUpload={onPhotoUpload} />
                    }
                </figure>
            </div>
            <ProfileButtonsContainer />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    photoIsUpdating: state.profilePage.photoIsUpdating,
    isMyProfile: state.profilePage.isMyProfile,
})

const connector = connect(mapStateToProps, {updatePhoto})
export default connector(ProfileHeader);
type ProfileHeaderConnectedProps = ConnectedProps<typeof connector>