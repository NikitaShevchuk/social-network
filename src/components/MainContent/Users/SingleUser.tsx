import React, {memo, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import userIcon from "../../../common/assets/img/userIcon.jpg";
import {Iuser} from "../../../types/usersTypes";
import {connect, ConnectedProps} from "react-redux";
import {followUser, unfollowUser} from "../../../redux/Reducers/usersReducer/middleware";
import {RootState} from "../../../redux/redux-store";

interface SingleUserProps extends SingleUserThunks {
    setSearchMode?: (searchMode: boolean) => void
    getDialog?: (id: number) => void
    user: Iuser
    disableWhileRequest: number[]
    key: number
}

const SingleUser = memo<SingleUserProps>(({
    followUser, unfollowUser, getDialog, setSearchMode,
    disableWhileRequest, user
}) => {
    const navLinkClickHandler = () => {
        if (getDialog) {
            getDialog(user.id)
            if (setSearchMode) setSearchMode(false)
        }
    }
    const buttonClickHandler = () => {
        user.followed ? unfollowUser(user.id) : followUser(user.id)
    }
    const [isButtonDisabled, toggleIsButtonDisabled] = useState(false)
    const [link, setLink] = useState('')
    useEffect( () => {
        if (getDialog) setLink(`/messages/${user.id}/`)
        else setLink(`/profile/${user.id}`)
    }, [getDialog, user.id] )
    useEffect(() => {
        toggleIsButtonDisabled(
            disableWhileRequest.some((item: number) => item === user.id)
        )
    }, [disableWhileRequest, user.id])
    const userImage = user.photos.small ? user.photos.small : userIcon
    return (
        <div key={user.id} className='opacity-animation'>
            <NavLink
                to={link}
                onClick={navLinkClickHandler}
                className="nearly-pepls"
            >
                <figure>
                    <img
                        src={userImage}
                        alt=""
                    />
                </figure>
                <div className="pepl-info">
                    <h4>{user.name}</h4>
                    <span>{user.status}</span>
                </div>
            </NavLink>
            <button
                className="add-butn"
                onClick={buttonClickHandler}
                disabled={isButtonDisabled}
            >
                {user.followed ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
});

const mapStateToProps = (state: RootState) => ({})

const connector = connect(mapStateToProps, {followUser, unfollowUser})

export default connector(SingleUser);

export type SingleUserThunks = ConnectedProps<typeof connector>