import React, {memo} from 'react';
import {NavLink} from "react-router-dom";

interface Props {
    isAuthorized: boolean
    name: string | null
}

const UserName = memo<Props>(({isAuthorized, name}) => {
    return (
        <div className="name">
            {isAuthorized ? name : <NavLink to='/login'>Login</NavLink>}
        </div>
    );
});

export default UserName;