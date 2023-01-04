import React, { FC } from 'react';
import FollowButton from '../../../Buttons/FollowButton';
import MessageButton from '../../../Buttons/MessageButton';

interface Props {
    isMyProfile: boolean;
    disableWhileRequest: boolean;
    enterEditMode: () => void;
    followed: boolean;
    userId: number;
    profileEditMode: boolean;
}

const ProfileButtons: FC<Props> = ({
    isMyProfile,
    disableWhileRequest,
    followed,
    enterEditMode,
    userId,
    profileEditMode
}) => (
    <div className="profile-buttons">
        {isMyProfile ? (
            !profileEditMode && (
                <button type="button" onClick={enterEditMode} className="add-butn transparent">
                    Edit profile
                </button>
            )
        ) : (
            <>
                <FollowButton followed={followed} userId={userId} disabled={disableWhileRequest} />
                <MessageButton userId={userId} />
            </>
        )}
    </div>
);

export default ProfileButtons;
