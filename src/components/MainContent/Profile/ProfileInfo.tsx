import React, {FC, memo} from 'react';
import style from "./Profile.module.css";
import AdditionalProfileInfo from "./AdditionalProfileInfo";
import {IProfileProps} from "./Profile";
import ProfileStatusContainer from "../../../common/commonComponents/ProfileStatus/ProfileStatusContainer";

export interface ProfileInfoProps extends IProfileProps {
    setProfileEditMode: (profileEditMode: boolean) => void
    isMyProfile: boolean
    userId: number
    profileEditMode: boolean
}

const ProfileInfo: FC<ProfileInfoProps> = memo(({
    setProfileEditMode, profile, isMyProfile, userId,
    followUser, unfollowUser, profileEditMode, followed
}) => {
    const followUserProfile = () => followUser(userId)
    const unfollowUserProfile = () => unfollowUser(userId)
    return <>
        <div className="admin-name timeline-info__row">
            <h5>{profile.fullName}</h5>
            <ProfileStatusContainer
                isMyProfile={isMyProfile}
            />
        </div>
        <AdditionalProfileInfo
            contacts={profile.contacts}
            setProfileEditMode={setProfileEditMode}
            userId={userId}
            isMyProfile={isMyProfile}
            profileEditMode={profileEditMode}
            followed={followed}
            unfollowUserProfile={unfollowUserProfile}
            followUserProfile={followUserProfile}
        />
        <div className='timeline-info__row'>
            <div className="lookingForAJob">
                <div className='lookingForAJobDescription'>
                    {profile.lookingForAJobDescription}
                </div>
                <div className={`${profile.lookingForAJob ? style.green : style.red}`}>
                    {profile.lookingForAJob
                        ? 'Looking for a job'
                        : 'Not interested in job'
                    }
                </div>
            </div>
        </div>
    </>
});

export default ProfileInfo;