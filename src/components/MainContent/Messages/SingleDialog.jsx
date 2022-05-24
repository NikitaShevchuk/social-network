import React from "react";
import userImg from '../../common/assets/img/userIcon.jpg'
import {NavLink} from "react-router-dom";
import Preloader from "../../common/Preloader";

const SingleDialog = (props) => {
    let {body, addedAt} = props.lastMessage
    let day = new Date(addedAt).getDay();
    let messageAddedTime = ''
    switch (day) {
        case 0:
            messageAddedTime =  'Mon'
            break
        case 1:
            messageAddedTime =  'Thu'
            break
        case 2:
            messageAddedTime =  'Wed'
            break
        case 3:
            messageAddedTime =  'Thur'
            break
        case 4:
            messageAddedTime =  'Fri'
            break
        case 5:
            messageAddedTime =  'Sut'
            break
        case 6:
            messageAddedTime =  'Sun'
            break
        default:
            messageAddedTime = 'Mon'
    }
    let lastMessage = `${body.length > 25 ? body.slice(0, 26) + '...' : body}`
    if (!props.id) return <Preloader/>
    return <li>
        <div className="last-activity">{messageAddedTime}</div>
        <figure>
            <img src={props.photos.small ? props.photos.small : userImg} alt=""/>
        </figure>
        <NavLink className='people-name' to={`/messages/${props.id}`}>
            <span className='dialog-header'>{props.userName}</span>
            <span className='dialog-message-text'>{lastMessage}</span>
        </NavLink>
        {props.hasNewMessages &&
            <div className="unreaded">{props.newMessagesCount}</div>
        }
    </li>
}

export default SingleDialog;