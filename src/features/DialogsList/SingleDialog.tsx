import React, {FC} from "react";
import userImg from '../../common/assets/img/userIcon.jpg'
import {NavLink} from "react-router-dom";
import Preloader from "../../preloaders/Preloader";
import {DialogWithMessage} from "../../types/MessagesTypes";
import {useGetDayByNumber} from "../../hooks/useGetDayByNumber";

const SingleDialog: FC<DialogWithMessage> = ({
    userName, id, newMessagesCount,
    hasNewMessages, photos, lastMessage
 }) => {
    const body = lastMessage?.body
    const addedAt = lastMessage?.addedAt ? lastMessage?.addedAt : '0';
    const messageAddedTime = useGetDayByNumber(addedAt)

    if (!id) return <Preloader/>

    return (
        <NavLink
            to={`/messages/${id}`}
            className='dialogs-list__item opacity-animation'
        >
            <span className="last-activity">{messageAddedTime}</span>
            <figure>
                <img src={photos.small ? photos.small : userImg} alt=""/>
            </figure>
            <span className='people-name'>
                <span className='dialog-header'>{userName}</span>
                {body &&
                    <span className='dialog-message-text'>{body}</span>
                }
            </span>
            {hasNewMessages &&
                <div className="unread">{newMessagesCount}</div>
            }
        </NavLink>
    )
}

export default SingleDialog;