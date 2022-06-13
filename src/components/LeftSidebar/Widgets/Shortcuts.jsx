import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import UserPhoto from "../../common/UserPhoto";
import UserName from "../../common/UserName";
import ProfileStatus from "../../MainContent/Profile/ProfileStatus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHome, faPlus, faPowerOff, faUser} from "@fortawesome/free-solid-svg-icons";

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
                <FontAwesomeIcon icon={faHome}/>
                <span> Home </span>
            </NavLink>
            <NavLink to='/messages'>
                <FontAwesomeIcon icon={faComment}/>
                <span> Messages </span>
            </NavLink>
            <NavLink to='/profile'>
                <FontAwesomeIcon icon={faUser}/>
                <span> My profile </span>
            </NavLink>
        </div>


        <div className="user-nav" ref={toggleSubnav}>
            <div className="user-nav__info" onClick={() => changeSubnav(true)}>
                <div className="user-nav__info-wrapper">
                    <div className="user-img">
                        <UserPhoto profileImg={props.profileImg}/>
                    </div>
                    <div className="user-name">
                        <UserName name={props.userData.login} isAuthorized={props.isAuthorized} />
                        <div className="status">
                            {props.isAuthorized ?
                                <ProfileStatus isMyProfile={false} status={props.status}
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
                    <FontAwesomeIcon icon={faPlus} />
                    <span className='logout'>Add another account</span>
                </div>
                <div className="user-nav__subnav-element" onClick={props.logout} >
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span className='logout'>Logout @{props.userData.login}</span>
                </div>
            </div>
        </div>
    </>
};

export default Shortcuts;