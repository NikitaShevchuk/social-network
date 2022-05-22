import React from "react";
import userIcon from "./assets/img/userIcon.jpg";
import {connect} from "react-redux";

const UserPhoto = (props) => {
    return <img src={props.userPhoto ? props.userPhoto : userIcon} alt=""/>
}

const mapStateToProps = (state) => ({profileImg: state.auth.userPhoto})
export default connect(mapStateToProps, {})(UserPhoto)