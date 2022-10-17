import React, {FC} from "react";
import UserPhoto from "../../../common/UserPhoto";
import {NavLink} from "react-router-dom";
import {Message} from "../../../types/MessagesTypes";

const SingleMessage: FC<Message> = ({profileImg, addedAt, myId, senderId, body, senderPhoto}) => {
    let messageAdded = new Date(addedAt)
    let minutes = messageAdded.getMinutes();
    let hours = messageAdded.getHours();
    let messageAddedTime = `${hours}:${minutes > 9 ? minutes : `0${minutes}` }`;
    return (
        <li className={myId === senderId ? 'me' : 'you' }>
            <NavLink to={`/profile/${senderId}`} ><figure><UserPhoto profileImg={myId === senderId ? profileImg : senderPhoto} /></figure> </NavLink>
            <p>
                <span className="text">{body}</span>
                <div className="message-added-time">{messageAddedTime}</div>
            </p>
        </li>
    )
}


export default SingleMessage;