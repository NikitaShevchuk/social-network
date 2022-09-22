import React, {FC, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import instruction from "../../common/assets/img/instruction.png";

const ACCOUNT_SETTINGS_LINK = 'https://social-network.samuraijs.com/account'

interface Props {
    modalWindow: boolean
    setModalWindow: (isShown: boolean) => void
}

const LoginModal: FC<Props> = ({setModalWindow, modalWindow}) => {
    const handleModalClose = () => setModalWindow(false)
    const modalRef = useRef(null)
    if (!modalWindow) return <></>
    return (
        <div className="modalWindow__wrapper opacity-animation">
            <div className="modalWindow" ref={modalRef}>
                <FontAwesomeIcon
                    className='close'
                    onClick={handleModalClose}
                    icon={faXmark}
                />
                <img src={instruction} alt=""/>
                <span className="text">
                    Generate your API-KEY at
                    <a href={ACCOUNT_SETTINGS_LINK} target='_blank'>
                        account security settings.
                    </a>
                </span>
            </div>
        </div>
    );
};

export default LoginModal;