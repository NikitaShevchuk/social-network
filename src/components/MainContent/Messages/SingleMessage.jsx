import React from "react";
import UserPhoto from "../../common/UserPhoto";

const SingleMessage = ({profileImg, addedAt, myId, senderId, body, senderPhoto}) => {
    let messageAdded = new Date(addedAt)
    let minutes = messageAdded.getMinutes();
    let hours = messageAdded.getHours();
    let messageAddedTime = `${hours}:${minutes > 9 ? minutes : `0${minutes}` }`;
    return (
        <li className={myId === senderId ? 'me' : 'you' }>
            <figure><UserPhoto profileImg={myId === senderId ? profileImg : senderPhoto} /></figure>
            <p>
                <span className="text">{body}</span>
                <div className="message-added-time">{messageAddedTime}</div>
            </p>
        </li>
    )
}


export default SingleMessage;