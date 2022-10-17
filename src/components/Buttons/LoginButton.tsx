import React from 'react';
import {NavLink} from "react-router-dom";

const LoginButton = () => {
    return (
        <NavLink to='/login' className="add-butn">login</NavLink>
    );
};

export default LoginButton;