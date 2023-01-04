import React, { FC, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import instruction from '../../../common/assets/img/instruction.png';
import { ModalWindowBody } from './ModalWindowBody';
import ModalWindow from '../../ModalWindow';

interface Props {
    apiKeyField: JSX.Element;
}

const ApiKeyModal: FC<Props> = ({ apiKeyField }) => {
    const [isModalWindowShown, setIsModalWindowShown] = useState<boolean>(false);
    const openModal = () => setIsModalWindowShown(true);
    const modalRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className="flex" ref={modalRef}>
            {apiKeyField}
            <div onClick={openModal} className="apiKey">
                What is API-KEY
                <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <ModalWindow
                setIsModalWindowShown={setIsModalWindowShown}
                isModalWindowShown={isModalWindowShown}
                image={instruction}
                body={<ModalWindowBody />}
                modalRef={modalRef}
                closeOnElementsClick={['modalWindow__wrapper']}
            />
        </div>
    );
};

export default ApiKeyModal;
