import React, {memo, useRef, useState} from 'react';
import UserPhoto from "../../../../common/commonComponents/UserPhoto";
import UserName from "../../../../common/commonComponents/UserName";
import useOnClickOutside from "../../../../hooks/onClickOutside";
import Subnav from "./Subnav";
import Status from "./Status";
import {UserData} from "../../../../types/authTypes";

interface Props {
    profileImg: string | null
    userData: UserData
    isAuthorized: boolean
    logout: () => void
}

const UserNav = memo<Props>(({
    profileImg, userData, isAuthorized, logout
}) => {
    let toggleSubnav = useRef<HTMLDivElement | null>(null);
    let [subnav, changeSubnav] = useState<boolean>(false);
    useOnClickOutside(toggleSubnav, changeSubnav, subnav)
    const handleNavClick = () => isAuthorized && changeSubnav(!subnav)
    return (
        <div className="user-nav" ref={toggleSubnav}>
            <div className="user-nav__info" onClick={handleNavClick}>
                <div className="user-nav__info-wrapper">
                    <div className="user-img">
                        <UserPhoto profileImg={profileImg}/>
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
				logout={logout} 
				subnav={subnav} 
				userData={userData} 
			/>
        </div>
    );
});

export default UserNav;