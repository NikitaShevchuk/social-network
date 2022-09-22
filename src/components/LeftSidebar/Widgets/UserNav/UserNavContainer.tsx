import React, {FC} from 'react';
import {RootState} from "../../../../redux/redux-store";
import {connect, ConnectedProps} from "react-redux";
import {logoutThunk} from "../../../../redux/Reducers/authReducer/middleware";
import UserNav from "./UserNav";

const UserNavContainer: FC<UserNavConnectedProps> = (props) => {
    const logout = () => {
        props.logoutThunk()
    }
    return (
        <UserNav
			{...props}
			logout={logout}
		/>
    );
};


let mapStateToProps = (state: RootState) => ({
    isAuthorized: state.auth.isAuthorized,
    userData: state.auth.userData,
    profileImg: state.auth.profileImg,
    clientStatus: state.auth.clientStatus
})

const connector = connect(
    mapStateToProps,
    {logoutThunk}
)

export default connector(UserNavContainer);
type UserNavConnectedProps = ConnectedProps<typeof connector>