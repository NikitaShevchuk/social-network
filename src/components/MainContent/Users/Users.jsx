import React from "react";
import style from './Users.module.css'
import Preloader from "../../common/Preloader";
import {NavLink} from "react-router-dom";
import userIcon from '../../common/assets/img/userIcon.jpg'

const Users = (props) => {
    let paginationItems = [];
    for (let i = 1; i <= 50; i++) {
        paginationItems.push(i)
    }
    return <div className="central-meta">
        <ul className="paginationz">
            {paginationItems.map(item => {
                return <li key={item}><span className={`item ${props.currentPage === item && style.active}`}
                                            onClick={() => props.onChangeCurrentPage(item)}>{item}</span></li>
            })}
        </ul>
        <div className="nearby-contct">
            {props.isFetching ? <Preloader/> : null}
            {props.users.map(user => <div key={user.id}>
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
                                    props.unfollowUserEvent(user.id)
                                }}
                                disabled={props.disableWhileRequest.some(item => item === user.id)}
                        >Unfollow</button> :
                        <button title="" className="add-butn"
                                onClick={() => {
                                    props.followUserEvent(user.id)
                                }}
                                disabled={props.disableWhileRequest.some(item => item === user.id)}
                        >Follow</button>
                    }
                </div>
            )}
        </div>
    </div>
}

export default Users;