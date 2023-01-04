import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginThunk } from '../../redux/reducers/auth-reducer/middleware';
import { testAccountData } from '../Login/Login';
import ConfirmModal from '../ModalWindow/ConfirmModal';

const LoginButton = () => {
    const dispatch = useDispatch();
    const handleTestAccountClick = () => {
        // TODO add typed dispatch hook
        // @ts-ignore
        dispatch(loginThunk(testAccountData));
    };
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const handleModalOpen = () => setIsModalOpened(true);
    const modalRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className="flex column" style={{ width: '100%' }} ref={modalRef}>
            <NavLink
                style={{
                    marginBottom: '1rem',
                    width: '90%',
                    textAlign: 'center'
                }}
                to="/login"
                className="add-butn"
            >
                Login / Auth
            </NavLink>
            <button
                type="button"
                onClick={handleModalOpen}
                className="add-butn whiteBg"
                // TODO remove temporary inline styles
                style={{ marginTop: '0', width: '90%' }}
            >
                Test account
            </button>
            <ConfirmModal
                confirmationText="Are you sure you want to use test account?"
                executeOnConfirm={handleTestAccountClick}
                isModalOpened={isModalOpened}
                modalRef={modalRef}
                setIsModalOpened={setIsModalOpened}
            />
        </div>
    );
};

export default LoginButton;
