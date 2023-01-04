import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import UserPhoto from '../../../common/UserPhoto';
import { Message } from '../../../types/MessagesTypes';

const SingleMessage: FC<Message> = ({ profileImg, addedAt, myId, senderId, body, senderPhoto }) => {
    const messageAdded = new Date(addedAt);
    const minutes = messageAdded.getMinutes();
    const hours = messageAdded.getHours();
    const messageAddedTime = `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
    return (
        <li className={myId === senderId ? 'me' : 'you'}>
            <NavLink to={`/profile/${senderId}`}>
                <figure>
                    <UserPhoto profileImg={myId === senderId ? profileImg : senderPhoto} />
                </figure>{' '}
            </NavLink>
            <p>
                <span className="text">{body}</span>
                <span className="message-added-time">{messageAddedTime}</span>
            </p>
        </li>
    );
};

export default SingleMessage;
