import React, {useEffect} from "react";
import userIcon from "../../common/assets/img/userIcon.jpg";
import style from './Profile.module.css'
import profileBackground from '../../common/assets/img/timeline-1.jpg'
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import {useParams} from "react-router-dom";

const Profile = (props) => {

    let userId = useParams().userId;

    if (!userId) userId = props.myId

    useEffect(() => {
        props.loadProfile(userId)
    }, [userId])

    const followUserProfile = () => {
        props.followUser(userId);
    }

    const unfollowUserProfile = () => {
        props.unfollowUser(userId);
    }

    if (!props.profile) return <Preloader />
    return <section>
        <div className="feature-photo">
            <figure><img src={profileBackground} alt=""/></figure>
            <div className="add-btn">
                {props.followed ?
                    <button title="" className="add-butn" disabled={props.disableWhileRequest} onClick={unfollowUserProfile}>Unfollow</button>:
                    <button title="" className="add-butn" disabled={props.disableWhileRequest} onClick={followUserProfile}>Follow</button>
                }
            </div>
            <div className="container-fluid">
                <div className="row merged">
                    <div className="col-lg-2 col-sm-3">
                        <div className="user-avatar">
                            <figure className={props.profile.photos.large ? style.transparent : style.whiteBg}>
                                <img src={ props.profile.photos.large ? props.profile.photos.large : userIcon } alt=""/>
                                <form className="edit-phto">
                                    <i className="fa fa-camera-retro"/>
                                    <label className="fileContainer">
                                        Edit Display Photo
                                        <input type="file"/>
                                    </label>
                                </form>
                            </figure>
                        </div>
                    </div>
                    <div className="col-lg-10 col-sm-9">
                        <div className="timeline-info">
                            <ul>
                                <li className="admin-name">
                                    <h5>{props.profile.fullName}</h5>
                                    <ProfileStatus  status={props.status} updStatusThunk={props.updStatusThunk} />
                                </li>
                                <li>
                                    <a className="active" href="time-line.html" title="">time line</a>
                                    <a className="" href="timeline-photos.html" title="">Photos</a>
                                    <a className="" href="timeline-videos.html" title="">Videos</a>
                                    <a className="" href="timeline-friends.html" title="">Friends</a>
                                    <a className="" href="timeline-groups.html" title="">Groups</a>
                                    <a className="" href="about.html" title="">about</a>
                                    <a className="" href="#" title="">more</a>
                                </li>
                                <li>
                                    <ul className="education">
                                        <li><i className="ti-facebook"></i> <a href={`${props.profile.contacts.facebook}`}>My Facebook</a></li>
                                        <li><i className="ti-twitter"></i><a href={`${props.profile.contacts.twitter}`}>My Twitter</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Profile;