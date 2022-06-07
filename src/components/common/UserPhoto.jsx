import React from "react";
import userIcon from "./assets/img/userIcon.jpg";
import {connect} from "react-redux";

const UserPhoto = (profileImg) => {
    return <img src={profileImg.profileImg ? profileImg.profileImg : userIcon} alt=""/>
}

export default UserPhoto