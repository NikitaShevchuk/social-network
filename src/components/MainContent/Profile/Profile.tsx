import React, {memo, useEffect, useState} from "react";
import Preloader from "../../../common/Preloader/Preloader";
import {useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import profileBackground from "../../../common/assets/img/profileCover.jpg";
import style from "./Profile.module.css";
import UserPhoto from "../../../common/commonComponents/UserPhoto";
import ErrorComponent from "../../../common/commonComponents/ErrorComponent";
import FeedContainer from "../Feed/FeedContainer";
import {ProfileProps} from "./ProfileContainer";
import EditProfilePhoto from "./EditProfilePhoto";

export interface IProfileProps extends ProfileProps {
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Profile = memo<IProfileProps>((props) => {
    let userId = Number(useParams().userId);
    let isMyProfile = false;
    if (!userId) userId = props.myId
    !userId || userId === props.myId ? isMyProfile = true : isMyProfile = false;
    let [profileEditMode, setProfileEditMode] = useState(false)

    useEffect(() => {
        props.loadProfile(userId)
    }, [userId])

    if (!props.profile) return <div className='central-meta'><Preloader/></div>
    return <div className='central-meta'>
        {
            props.localError && <ErrorComponent errorText={props.localError} />
        }
        <div className="feature-photo">
            <figure>
                <img src={profileBackground} alt=""/>
            </figure>
            <div className="bg">
                <div className="timeline-info">
                    <div className="user-avatar">
                        <figure
                            className={
                            props.profile.photos?.large && !props.photoUpdating ?
                                style.transparent
                                :
                                style.whiteBg}
                        >
                            {props.photoUpdating ?
                                <Preloader/>
                                :
                                <UserPhoto profileImg={props.profile.photos?.large}/>
                            }
                            {isMyProfile ?
                                <EditProfilePhoto onPhotoUpload={props.onPhotoUpload} />
                                :
                                ''
                            }
                        </figure>
                    </div>
                    <div className="timeline-info__container">
                        {profileEditMode ?
                            <EditProfile
                                {...props}
                                setProfileEditMode={setProfileEditMode}
                                profileEditMode={profileEditMode}
                                isMyProfile={isMyProfile}
                            />
                            :
                            <ProfileInfo
                                {...props}
                                setProfileEditMode={setProfileEditMode}
                                profileEditMode={profileEditMode}
                                isMyProfile={isMyProfile}
                                userId={userId}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
        <FeedContainer/>
    </div>
})

export default Profile;
