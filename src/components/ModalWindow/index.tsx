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
    onEnterKey?: () => void;
    closeOnElementsClick?: string[];
    exceptions?: string[];
}

const ModalWindow: FC<Props> = ({
    setIsModalWindowShown,
    isModalWindowShown,
    body,
    image,
    modalRef,
    onEnterKey,
    closeOnElementsClick,
    exceptions,
}) => {
    const handleModalClose = () => setIsModalWindowShown(false);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") handleModalClose();
        if (e.key === "Enter") onEnterKey && onEnterKey();
    };

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (isModalWindowShown) {
            wrapperRef.current && wrapperRef.current.focus();
        }
    }, [isModalWindowShown]);

    const modalWrapperClassName = isModalWindowShown ? "" : "hidden";
    useOnClickOutside({
        ref: modalRef,
        callback: setIsModalWindowShown,
        closeOnElementsClick,
        exceptions,
    });
    return (
        <div
            onKeyDown={handleKeyDown}
            ref={wrapperRef}
            tabIndex={0}
            className={`modalWindow__wrapper ${modalWrapperClassName}`}
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

export default ModalWindow;
