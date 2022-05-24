import React from 'react';
import style from "./Profile.module.css";
import Preloader from "../../common/Preloader";
import UserPhoto from "../../common/UserPhoto";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({setProfileEditMode, profile, isMyProfile, userId, ...props}) => {
    const followUserProfile = () => {
        props.followUser(userId);
    }
    const unfollowUserProfile = () => {
        props.unfollowUser(userId);
    }
    return <>
        <div className="admin-name timeline-info__row">
            <h5>{profile.fullName}</h5>
            <ProfileStatus isMyProfile={isMyProfile} status={props.status}
                           updStatusThunk={props.updStatusThunk}/>
        </div>
        {isMyProfile ?
            <button onClick={() => setProfileEditMode(true)} className="add-butn">Edit profile</button>
            :
            props.followed ?

                <button title="" className="add-butn" disabled={props.disableWhileRequest}
                        onClick={unfollowUserProfile}>Unfollow</button> :

                <button title="" className="add-butn" disabled={props.disableWhileRequest}
                        onClick={followUserProfile}>Follow</button>
        }
        <div className='timeline-info__row'>
            <div className="lookingFoAJob">
                <div className={`${profile.lookingFoAJob ? style.green : style.red}`}>
                    {profile.lookingFoAJob ? 'Looking for a job' : 'Not interested in job'}
                </div>
                <div>
                    {profile.lookingFoAJobDescription}
                </div>
            </div>
        </div>
    </>
};

export default ProfileInfo;