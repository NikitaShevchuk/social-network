import React, {FC} from 'react';
import {RootState} from "../../../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import {logoutThunk} from "../../../../redux/reducers/authReducer/middleware";
import UserNav from "./UserNav";

const UserNavContainer: FC<UserNavConnectedProps> = (props) => {
    return (
        <UserNav {...props} />
    );
};

const mapStateToProps = (state: RootState) => ({
    isAuthorized: state.auth.isAuthorized,
    userData: state.auth.userData,
    profileImg: state.auth.profileImg,
})

const connector = connect(
    mapStateToProps,
    {logoutThunk}
)

export default connector(UserNavContainer);
export type UserNavConnectedProps = ConnectedProps<typeof connector>