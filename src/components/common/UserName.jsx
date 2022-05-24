import React from 'react';
import {NavLink} from "react-router-dom";

const UserName = (props) => {
    return (
        <div className="name">{props.isAuthorized ? props.name : <NavLink to='/login'>Login</NavLink>}</div>
    );
};

export default UserName;