import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHome, faUser} from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    return (
        <div className="naves">
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