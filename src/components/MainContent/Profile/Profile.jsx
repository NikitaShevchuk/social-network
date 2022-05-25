import React, {useEffect, useState} from "react";
import Preloader from "../../common/Preloader";
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
        if (e.target.files[0]) props.updatePhoto(e.target.files[0])
    }
    if (!props.profile) return <Preloader/>
    return <div className='central-meta'>
        <div className="feature-photo">
            <figure>
                <img src={profileBackground} alt=""/>
                <div className="social-media">
                    <div className='social-media__element'><a
                        href={`${props.profile.contacts.facebook}`}
                        target='_blank'
                    ><i className="ti-facebook"/></a></div>
                    <div className='social-media__element'>
                        <a href={`${props.profile.contacts.twitter}`} target='_blank'><i className="ti-twitter"/></a>
                    </div>
                </div>
            </figure>
            <div className="bg">
                <div className="timeline-info">
                    <div className="user-avatar">
                        <figure
                            className={props.profile.photos?.large && !props.photoUpdating ? style.transparent : style.whiteBg}>
                            {props.photoUpdating ? <Preloader/> :
                                <UserPhoto userPhoto={props.profile.photos?.large}/>
                            }
                            {isMyProfile ?
                                <form className="edit-phto">
                                    <i className="fa fa-edit"/>
                                    <label className="fileContainer">
                                        Edit Display Photo
                                        <input onChange={onPhotoUpload} type="file"/>
                                    </label>
                                </form>
                                :
                                ''
                            }
                        </figure>
                    </div>
                    <div className="timeline-info__container">
                        {profileEditMode ? <EditProfile {...props} setProfileEditMode={setProfileEditMode}
                                                        isMyProfile={isMyProfile}/> :
                            <ProfileInfo {...props} setProfileEditMode={setProfileEditMode} isMyProfile={isMyProfile}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        followed: state.profilePage.followed,
        disableWhileRequest: state.profilePage.disableWhileRequest,
        status: state.profilePage.status,
        myId: state.auth.userData.id,
        photoUpdating: state.profilePage.photoUpdating
    }
}

export default compose(
    withRedirect,
    connect(mapStateToProps, {followUser, unfollowUser, loadProfile, updStatusThunk, updatePhoto, updateProfile})
)(Profile);