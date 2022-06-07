import React, {memo, useEffect, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../common/assets/img/userIcon.jpg'

const Users = ({loadUsers, users, unfollowUserEvent, followUserEvent, disableWhileRequest, isFetching}) => {
    if (!users) return <Preloader />
    return <div className="central-meta">
        <div className="nearby-contct" onScroll={loadUsers}>
            {users.map(user => <div key={user.id} className='opacity-animation'>
                    <NavLink to={`/profile/${user.id}`} className="nearly-pepls">
                        <figure>
                            <img src={user.photos.small ? user.photos.small : userIcon}
                                 alt=""/>
                        </figure>
                        <div className="pepl-info">
                            <h4>{user.name}</h4>
                            <span>ftv model</span>
                        </div>
                    </NavLink>
                    {user.followed ?
                        <button title="" className="add-butn"
                                onClick={() => {
                                    unfollowUserEvent(user.id)
                                }}
                                disabled={disableWhileRequest.some(item => item === user.id)}
                        >Unfollow</button> :
                        <button title="" className="add-butn"
                                onClick={() => {
                                    followUserEvent(user.id)
                                }}
                                disabled={disableWhileRequest.some(item => item === user.id)}
                        >Follow</button>
                    }
                </div>
            )}
            {isFetching ? <Preloader/> : null}
        </div>
    </div>
}

export default memo(Users);