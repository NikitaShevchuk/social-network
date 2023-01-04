import React, { FC } from 'react';
import ProfileStatusContainer from '../../../../common/ProfileStatus/ProfileStatusContainer';

interface Props {
    isAuthorized: boolean;
}

const Status: FC<Props> = ({ isAuthorized }) => (
    <div className="status">
        {isAuthorized ? <ProfileStatusContainer isMyProfile /> : 'Login to add status'}
    </div>
);

export default Status;
