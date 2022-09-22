import React, {FC, memo} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {UserData} from "../../../../types/authTypes";

interface Props {
    logout: () => void
    subnav: boolean
    userData: UserData
}

const Subnav: FC<Props> = memo(({logout, subnav, userData}) => {
    return (
        <div className={`user-nav__subnav ${ subnav ? 'active' : '' }`}>
            <div className="user-nav__subnav-element" onClick={logout} >
                <FontAwesomeIcon icon={faPlus} />
                <span className='logout'>Add another account</span>
            </div>
            <div className="user-nav__subnav-element" onClick={logout} >
                <FontAwesomeIcon icon={faPowerOff} />
                <span className='logout'>Logout @{userData.login}</span>
            </div>
        </div>
    );
});

export default Subnav;