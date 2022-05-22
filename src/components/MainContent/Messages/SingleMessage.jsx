import React from "react";
import UserPhoto from "../../common/UserPhoto";

const SingleMessage = (props) => {
    let messageAdded = new Date(props.addedAt)
    let minutes = messageAdded.getMinutes();
    let hours = messageAdded.getHours();
    let messageAddedTime = `${hours}:${minutes > 9 ? minutes : `0${minutes}` }`;
    return (
        <li className={props.myId === props.senderId ? 'me' : 'you' }>
            <figure><UserPhoto/></figure>
            <p>
                <span className="text">{props.body}</span>
                <div className="message-added-time">{messageAddedTime}</div>
            </p>
        </li>
    )
}


export default SingleMessage;