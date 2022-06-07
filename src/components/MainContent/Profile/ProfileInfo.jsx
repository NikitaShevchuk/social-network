import React from 'react';
import style from "./Profile.module.css";
import ProfileStatus from "./ProfileStatus";
import AdditionalProfileInfo from "./AdditionalProfileInfo";

const ProfileInfo = ({setProfileEditMode, profile, isMyProfile,
                         userId, followUser, unfollowUser,
                         updStatusThunk, status, profileEditMode, followed,setMyStatus}) => {

    const followUserProfile = () => {
        followUser(userId);
    }
    const unfollowUserProfile = () => {
        unfollowUser(userId);
    }

    return <>
        <div className="admin-name timeline-info__row">
            <h5>{profile.fullName}</h5>
            <ProfileStatus isMyProfile={isMyProfile}
                           status={status}
                           updStatusThunk={updStatusThunk}
                           setMyStatus={setMyStatus}
            />
        </div>
        <AdditionalProfileInfo
            contacts={profile.contacts} setProfileEditMode={setProfileEditMode}
            isMyProfile={isMyProfile} profileEditMode={profileEditMode} followed={followed}
            unfollowUserProfile={unfollowUserProfile} followUserProfile={followUserProfile}
        />
        <div className='timeline-info__row'>
            <div className="lookingForAJob">
                <div className='lookingForAJobDescription'>
                    {profile.lookingForAJobDescription}
                </div>
                <div className={`${profile.lookingForAJob ? style.green : style.red}`}>
                    {profile.lookingForAJob ? 'Looking for a job' : 'Not interested in job'}
                </div>
            </div>
        </div>
    </>
};

export default ProfileInfo;