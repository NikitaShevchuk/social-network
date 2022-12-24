import React, { memo, useRef, useState } from "react";
import UserPhoto from "../../../../common/UserPhoto";
import UserName from "../../../../common/UserName";
import useOnClickOutside from "../../../../hooks/onClickOutside";
import Subnav from "./Subnav";
import Status from "./Status";
import { UserNavConnectedProps } from "./UserNavContainer";
import LoginButton from "../../../Buttons/LoginButton";

const UserNav = memo<UserNavConnectedProps>(
    ({ profileImg, userData, isAuthorized, logoutThunk }) => {
        const toggleSubnav = useRef<HTMLDivElement | null>(null);
        const [isSubnavOpened, setIsSubnavOpened] = useState<boolean>(false);
        useOnClickOutside(toggleSubnav, setIsSubnavOpened);
        const handleNavClick = () =>
            isAuthorized && setIsSubnavOpened(!isSubnavOpened);

        if (!isAuthorized)
            return (
                <div className="user-nav">
                    <LoginButton />
                </div>
            );

        return (
            <div className="user-nav" ref={toggleSubnav}>
                <div className="user-nav__info" onClick={handleNavClick}>
                    <div className="user-nav__info-wrapper">
                        <div className="user-img">
                            <UserPhoto profileImg={profileImg} />
                        </div>
                        <div className="user-name">
                            <UserName
                                name={userData.login}
                                isAuthorized={isAuthorized}
                            />
                            <Status isAuthorized={isAuthorized} />
                        </div>
                    </div>
                    <div className="open-subnav">...</div>
                </div>
                <Subnav
                    logout={logoutThunk}
                    isSubnavOpened={isSubnavOpened}
                    userData={userData}
                />
            </div>
        );
    }
);

export default UserNav;
