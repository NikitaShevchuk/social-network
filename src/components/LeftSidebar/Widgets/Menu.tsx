import React from 'react'
import {NavLink, useLocation} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import logoImage from '../../../common/assets/img/logo.svg'
import {getMenuItems} from "./menuItems";
import LastMessagesIcon from '../../../common/LastMessagesIcon';

const Menu = () => {
    const location = useLocation().pathname
    return (
        <nav className="naves">
            <div className="main-logo">
                <img className='main-logo__image' src={logoImage} alt=''/>
                <div className="main-logo__text">Social-network</div>
            </div>
                <div className="naves-links">
                    {getMenuItems(location).map( menuItem => (
                        <NavLink 
                            key={menuItem.name} 
                            to={menuItem.link}
                            className='naves-links__item'
                        >
                            {menuItem.name === 'Home' && location !== '/'
                                ? <img src={menuItem.icon} alt=""/>
                                : <FontAwesomeIcon icon={menuItem.icon}/>
                            }
                            <span> {menuItem.name} </span>
                        </NavLink>
                    ))}
                    <LastMessagesIcon />
            </div>
        </nav>
    );
};

export default Menu;