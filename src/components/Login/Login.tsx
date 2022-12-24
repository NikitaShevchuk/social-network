import React, { FC, useRef, useState } from "react";
import { Form } from "react-final-form";
import { loginFormRender } from "./Helpers/loginFormRender";
import { FormValues } from "./LoginContainer";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../ModalWindow/ConfirmModal";

export const testAccountData: FormValues = {
    email: "shevchuk.nikita.gh@gmail.com",
    password: "test_account_password",
    cookie: "20eb1751-84d0-404e-821a-4627208085c2",
    rememberMe: false,
};

export interface Captcha {
    url: string | null;
}

type LoginFormProps = {
    submitForm: (formValues: FormValues) => void;
    captcha: Captcha;
    loginFailed: string | null;
};

const Login: FC<LoginFormProps> = ({ submitForm, loginFailed, captcha }) => {
    const loginViaTestAccount = () => submitForm(testAccountData);
    const confirmModalRef = useRef<HTMLDivElement | null>(null);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const openConfirmationModal = () => setIsModalOpened(true);
    return (
        <div className="central-meta">
            <h4 className="sidebarHeader flex between">
                LOGIN
                <div ref={confirmModalRef}>
                    <div className="apiKey" onClick={openConfirmationModal}>
                        <span className="text"> Use test account </span>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                    <ConfirmModal
                        confirmationText="Are you sure you want to use test account?"
                        executeOnConfirm={loginViaTestAccount}
                        modalRef={confirmModalRef}
                        isModalOpened={isModalOpened}
                        setIsModalOpened={setIsModalOpened}
                    />
                </div>
            </h4>
            <div className="editing-info">
                <Form
                    onSubmit={submitForm}
                    render={loginFormRender(loginFailed, captcha)}
                />
            </div>
        </div>
    );
};

export default Login;
