import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";

const LastMessages = ({dialogs, isAuthorized, myId, setDialogs}) => {
    useEffect(() => {
        setDialogs(myId)
    }, [])
    if (!dialogs[0]) return <Preloader />
    return <>
        {isAuthorized ?
            <ul className="peoples">
                {dialogs}
            </ul>
            :
            <div className="notAuthorized">
                <span className="text">Authorize to see messages</span>
                <NavLink to='/login' className="add-butn">Login</NavLink>
            </div>
        }
    </>
};

export default LastMessages;