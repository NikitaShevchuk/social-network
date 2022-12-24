import React, { FC, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useOnClickOutside from "../../hooks/onClickOutside";

interface Props {
    isModalWindowShown: boolean;
    setIsModalWindowShown: (isShown: boolean) => void;
    body?: string | JSX.Element;
    image?: string;
    modalRef: React.MutableRefObject<any> | null;
}

const LoginModal: FC<Props> = ({
    setIsModalWindowShown,
    isModalWindowShown,
    body,
    image,
    modalRef,
}) => {
    const handleModalClose = () => setIsModalWindowShown(false);
    useOnClickOutside(modalRef, setIsModalWindowShown);
    const modalWrapperClassName = isModalWindowShown ? "" : "hidden";
    return (
        <div
            className={`modalWindow__wrapper opacity-animation ${modalWrapperClassName}`}
        >
            <div className="modalWindow">
                <FontAwesomeIcon
                    className="close"
                    onClick={handleModalClose}
                    fontSize="25px"
                    icon={faXmark}
                />
                {image && <img src={image} alt="" />}
                {body}
            </div>
        </div>
    );
};

export default LoginModal;
