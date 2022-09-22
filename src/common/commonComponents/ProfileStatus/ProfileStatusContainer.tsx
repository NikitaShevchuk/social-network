import React, {FC} from 'react';
import {RootState} from "../../../redux/redux-store";
import {updStatusThunk} from "../../../redux/Reducers/profileReducer/middleware";
import {connect, ConnectedProps} from "react-redux";
import ProfileStatus from "./ProfileStatus";

export interface ProfileStatusProps extends ProfileStatusConnectedProps {
    isMyProfile: boolean
    setMyStatus?: (status: string) => void
}

const ProfileStatusContainer: FC<ProfileStatusProps> = (props) => {
    return (
        <ProfileStatus
            {...props}
            isMyProfile={props.isMyProfile}
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    status: state.profilePage.status
})
const mapDispatchToProps = () => ({
    updStatusThunk
})

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(ProfileStatusContainer);
type ProfileStatusConnectedProps = ConnectedProps<typeof connector>