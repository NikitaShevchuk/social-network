import React, { FC } from "react";
import ModalWindow from ".";

interface ConfirmProps {
    handleContinueClick: () => void;
    handleCancelClick: () => void;
    confirmationText: string;
}

const ConfirmModalBody: FC<ConfirmProps> = ({
    handleContinueClick,
    handleCancelClick,
    confirmationText,
}) => {
    return (
        <div tabIndex={0} className="confirmation-modal">
            <div className="text">{confirmationText}</div>
            <div className="flex center">
                <button
                    className="add-butn mr-20"
                    onClick={handleContinueClick}
                >
                    Continue
                </button>
                <button
                    className="add-butn whiteBg"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

interface Props {
    executeOnConfirm: () => void;
    confirmationText: string;
    isModalOpened: boolean;
    setIsModalOpened: (isOpened: boolean) => void;
    modalRef: React.MutableRefObject<any> | null;
}

const ConfirmModal: FC<Props> = ({
    confirmationText,
    executeOnConfirm,
    isModalOpened,
    setIsModalOpened,
    modalRef,
}) => {
    const handleCancelClick = () => setIsModalOpened(false);
    const handleContinueClick = () => {
        executeOnConfirm();
        setIsModalOpened(false);
    };
    return (
        <ModalWindow
            isModalWindowShown={isModalOpened}
            modalRef={modalRef}
            setIsModalWindowShown={setIsModalOpened}
            onEnterKey={handleContinueClick}
            body={
                <ConfirmModalBody
                    handleCancelClick={handleCancelClick}
                    handleContinueClick={handleContinueClick}
                    confirmationText={confirmationText}
                />
            }
        />
    );
};

export default ConfirmModal;
