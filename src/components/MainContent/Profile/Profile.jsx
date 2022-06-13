import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";
import {
    followUser,
    loadProfile,
    unfollowUser,
    updatePhoto,
    updateProfile,
    updStatusThunk
} from "../../redux/ProfilePageReducer";
import {compose} from "redux";
import withRedirect from "../../HOC/withRedirect";
import EditProfile from "./EditProfile";
import profileBackground from "../../common/assets/img/profileCover.jpg";
import style from "./Profile.module.css";
import UserPhoto from "../../common/UserPhoto";
import ErrorComponent from "../../common/ErrorComponent";
import {setMyStatus, updateProfileImg} from "../../redux/auth";
import FeedContainer from "../Feed/FeedContainer";

const Profile = (props) => {

    let userId = useParams().userId;
    let isMyProfile = false;
    if (!userId) userId = props.myId
    !userId || userId === props.myId ? isMyProfile = true : isMyProfile = false;

    let [profileEditMode, setProfileEditMode] = useState(false)

    useEffect(() => {
        props.loadProfile(userId)
    }, [userId])

    const onPhotoUpload = (e) => {
        if (e.target.files[0]) props.updatePhoto(e.target.files[0]).then(response => {
            props.updateProfileImg(response)
        })
    }
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
                            className={props.profile.photos?.large && !props.photoUpdating ? style.transparent : style.whiteBg}>
                            {props.photoUpdating ? <Preloader/> :
                                <UserPhoto profileImg={props.profile.photos?.large}/>
                            }
                            {isMyProfile ?
                                <form className="edit-phto">
                                    <i className="fa fa-edit"/>
                                    <label className="fileContainer">
                                        Edit Display Photo
                                        <input onChange={onPhotoUpload} type="file" accept=".jpg, .jpeg, .png"/>
                                    </label>
                                </form>
                                :
                                ''
                            }
                        </figure>
                    </div>
                    <div className="timeline-info__container">
                        {profileEditMode ? <EditProfile {...props} setProfileEditMode={setProfileEditMode}
                                                        profileEditMode={profileEditMode}
                                                        isMyProfile={isMyProfile}/> :
                            <ProfileInfo {...props} setProfileEditMode={setProfileEditMode}
                                         profileEditMode={profileEditMode}
                                         isMyProfile={isMyProfile}
                                         setMyStatus={props.setMyStatus}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
        <FeedContainer/>
    </div>
}


let mapStateToProps = (state) => {
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

export default compose(
    withRedirect,
    connect(mapStateToProps, {followUser, unfollowUser, loadProfile, updStatusThunk, updatePhoto, updateProfile, updateProfileImg, setMyStatus})
)(Profile);