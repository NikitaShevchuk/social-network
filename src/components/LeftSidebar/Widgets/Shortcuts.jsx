import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import UserPhoto from "../../common/UserPhoto";
import UserName from "../../common/UserName";
import ProfileStatus from "../../MainContent/Profile/ProfileStatus";

const Shortcuts = (props) => {
    let toggleSubnav = useRef();
    let [subnav, changeSubnav] = useState(false);
    useEffect(() => {
        let clickOutsideElement = e => {
            if (subnav && toggleSubnav.current && !toggleSubnav.current.contains(e.target)) {
                changeSubnav(false)
            }
        }
        document.addEventListener('mousedown', clickOutsideElement)
        return () => {
            document.removeEventListener('mousedown', clickOutsideElement)
        }
    }, [subnav])
    let isMyProfile = true;
    return <>
        <div className="naves">
            <NavLink to='/'>
                <i className="ti-clipboard"/>
                <span> News feed </span>
            </NavLink>
            <NavLink to='/messages'>
                <i className="ti-comments-smiley"/>
                <span> Messages </span>
            </NavLink>
            <NavLink to='/profile'>
                <i className="ti-user"/>
                <span> My profile </span>
            </NavLink>
            <NavLink to='/users'>
                <i className="ti-share"/>
                <span> People Nearby </span>
            </NavLink>
        </div>


        <div className="user-nav" ref={toggleSubnav}>
            <div className="user-nav__info" onClick={() => changeSubnav(true)}>
                <div className="user-nav__info-wrapper">
                    <div className="user-img">
                        <UserPhoto  />
                    </div>
                    <div className="user-name">
                        <UserName name={props.userData.login} isAuthorized={props.isAuthorized} />
                        <div className="status">
                            {props.isAuthorized ?
                                <ProfileStatus isMyProfile={isMyProfile} status={props.status}
                                               updStatusThunk={props.updStatusThunk}/>
                                :
                                'Login to add status'
                            }

                        </div>
                    </div>
                </div>
                <div className="open-subnav">...</div>
            </div>
            <div className={`user-nav__subnav ${ subnav ? 'active': '' }`}>
                <div className="user-nav__subnav-element" onClick={props.logout} >
                    <i className="ti-plus"/>
                    <span className='logout'>Add another account</span>
                </div>
                <div className="user-nav__subnav-element" onClick={props.logout} >
                    <i className="ti-power-off"/>
                    <span className='logout'>Logout @{props.userData.login}</span>
                </div>
            </div>
        </div>
    </>
};

export default Shortcuts;