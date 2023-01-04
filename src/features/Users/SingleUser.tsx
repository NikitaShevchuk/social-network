import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import userIcon from '../../common/assets/img/userIcon.jpg';
import { User } from '../../types/UsersTypes';
import FollowButton from '../../components/Buttons/FollowButton';
import MessageButton from '../../components/Buttons/MessageButton';

interface Props {
    setSearchMode?: (searchMode: boolean) => void;
    getDialog: (id: number) => void;
    startDialogOnClick: boolean;
    user: User;
    disableWhileRequest: number[];
}

const SingleUser = memo<Props>(
    ({ getDialog, setSearchMode, disableWhileRequest, user, startDialogOnClick }) => {
        const [isButtonDisabled, toggleIsButtonDisabled] = useState(false);
        const [link, setLink] = useState('');

        useEffect(() => {
            if (startDialogOnClick) setLink(`/messages/${user.id}/`);
            else setLink(`/profile/${user.id}`);
        }, [startDialogOnClick, user.id]);
        useEffect(() => {
            toggleIsButtonDisabled(disableWhileRequest.some((item: number) => item === user.id));
        }, [disableWhileRequest, user.id]);

        const navLinkClickHandler = () => {
            if (startDialogOnClick) {
                getDialog(user.id);
                if (setSearchMode) setSearchMode(false);
            }
        };
        const userImage = user.photos.small ? user.photos.small : userIcon;
        return (
            <div key={user.id} className="opacity-animation">
                <NavLink to={link} onClick={navLinkClickHandler} className="nearly-pepls">
                    <figure>
                        <img src={userImage} alt="" />
                    </figure>
                    <div className="pepl-info">
                        <h4>{user.name}</h4>
                        <span>{user.status}</span>
                    </div>
                </NavLink>
                {!startDialogOnClick && <MessageButton userId={user.id} />}
                <FollowButton
                    userId={user.id}
                    disabled={isButtonDisabled}
                    followed={user.followed}
                />
            </div>
        );
    }
);

export default SingleUser;
