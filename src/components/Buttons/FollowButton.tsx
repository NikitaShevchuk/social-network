import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/reducers/users-reducer/middleware';

interface Props extends FollowButtonConnectedProps {
    userId: number;
    disabled: boolean;
    followed: boolean;
}

const FollowButton: FC<Props> = ({ followUser, unfollowUser, userId, followed, disabled }) => {
    const handleClick = () => (followed ? unfollowUser(userId) : followUser(userId));
    return (
        <button type="button" className="add-butn" onClick={handleClick} disabled={disabled}>
            {followed ? 'Unfollow' : 'Follow'}
        </button>
    );
};
const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, { followUser, unfollowUser });

export default connector(FollowButton);
type FollowButtonConnectedProps = ConnectedProps<typeof connector>;
