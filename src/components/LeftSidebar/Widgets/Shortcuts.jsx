import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import UserPhoto from "../../common/UserPhoto";

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
                        <UserPhoto />
                    </div>
                    <div className="user-name">
                        <div className="name">{props.isAuthorized ? props.userData.login : <NavLink to='/login'>Login</NavLink>}</div>
                        <div className="status">status</div>
                    </div>
                </div>
                <div className="open-subnav">...</div>
            </div>
            <div className={`user-nav__subnav ${ subnav ? 'active': '' }`}>
                <i className="ti-power-off"/>
                <button className='logout' onClick={props.logout}>Logout</button>
            </div>
        </div>
    </>
};

export default Shortcuts;