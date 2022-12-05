import React, {FC, memo} from 'react';
import style from "./Profile.module.scss";
import ProfileStatusContainer from "../../../common/ProfileStatus/ProfileStatusContainer";
import {Profile} from "../../../types/ProfileTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from 'classnames';

export interface Props {
    isMyProfile: boolean
    profileEditMode: boolean
    profile: Profile
}

const ProfileInfo: FC<Props> = memo(({
    profile, isMyProfile, profileEditMode
}) => {
    const jobBlockClassName = profile.lookingForAJob ? style.green : style.red
    return (
        <div className={classNames(
            style.profileData, profileEditMode ? style.hidden : style.shown
        )}>
            <div className="admin-name timeline-info__row">
                <h5>{profile.fullName}</h5>
                <ProfileStatusContainer
                    isMyProfile={isMyProfile}
                />
            </div>
            <div className='timeline-info__row'>
                <div className="lookingForAJob">
                    {profile.aboutMe && profile.aboutMe !== '' &&
                        <div className="small-subtitle">
                            <FontAwesomeIcon icon={"fa-solid fa-address-card" as any} />
                            <span className="text">About:</span>
                            {profile.aboutMe}
                        </div>
                    }
                    <div className='lookingForAJobDescription'>
                        {profile.lookingForAJobDescription}
                    </div>
                    <div className={style.jobStyle}>
                        <FontAwesomeIcon
                            icon={`fa fa-briefcase` as any}
                            className={style.icon}
                        />
                        Job status:
                        <span className={jobBlockClassName}>
                            {profile.lookingForAJob
                                ? ` looking for a job`
                                : ` not interested in job`
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ProfileInfo;