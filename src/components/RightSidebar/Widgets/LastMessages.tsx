import React, {FC, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import Preloader from "../../../common/Preloader/Preloader";
import {RightSidebarProps} from "../RightSidebar";

const LastMessages: FC<RightSidebarProps> = ({dialogs, isAuthorized, myId, setDialogs}) => {
    useEffect(() => {
        if(isAuthorized) setDialogs(myId)
    }, [isAuthorized])
    if (!isAuthorized) return (

        <div className="notAuthorized">
            <span className="text">Authorize to see messages</span>
            <NavLink to='/login' className="add-butn">Login</NavLink>
        </div>

    )
    if (!dialogs[0]) return <Preloader />
    return (
        <ul className="peoples">
            {dialogs}
        </ul>
    )
};

export default LastMessages;