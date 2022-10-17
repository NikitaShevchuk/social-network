import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import logoImage from '../../../common/assets/img/logo.svg'

const Menu = () => {
    return (
        <div className="naves">
            <div className="main-logo">
                <img className='main-logo__image' src={logoImage} alt=''/>
                <div className="main-logo__text">Social-network</div>
            </div>
            <NavLink to=''>
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
    );
};

export default Menu;