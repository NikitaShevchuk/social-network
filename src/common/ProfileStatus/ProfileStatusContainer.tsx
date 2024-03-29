import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/redux-store';
import ProfileStatus from './ProfileStatus';
import { updStatusThunk } from '../../redux/reducers/auth-reducer/middleware';

export interface ProfileStatusProps extends ProfileStatusConnectedProps {
    isMyProfile: boolean;
}

const ProfileStatusContainer: FC<ProfileStatusProps> = ({
    isMyProfile,
    status,
    clientStatus,
    updStatusThunk
}) => {
    const statusToDisplay = isMyProfile ? clientStatus : status;
    return (
        <ProfileStatus
            status={statusToDisplay}
            updStatusThunk={updStatusThunk}
            isMyProfile={isMyProfile}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    status: state.profilePage.status,
    clientStatus: state.auth.clientStatus
});
const connector = connect(mapStateToProps, {
    updStatusThunk
});
export default connector(ProfileStatusContainer);
type ProfileStatusConnectedProps = ConnectedProps<typeof connector>;
