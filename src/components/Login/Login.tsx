import React, {FC, useState} from "react";
import {Form} from "react-final-form";
import LoginModal from "./LoginModal";
import {loginFormRender} from "./Helpers/loginFormRender";
import {FormValues} from "./LoginContainer";

export interface Captcha {url: string | null}

type LoginFormProps = {
    submitForm: (formValues: FormValues) => void
    captcha: Captcha
    loginFailed: string | null
}

const Login: FC<LoginFormProps> = ({
    submitForm, loginFailed, captcha
}) => {
    const [modalWindow, setModalWindow] = useState<boolean>(false);
    return <>
        <Form
            onSubmit={submitForm}
            render={loginFormRender(setModalWindow, loginFailed, captcha)}
        />
        <LoginModal
            setModalWindow={setModalWindow}
            modalWindow={modalWindow}
        />
    </>
}

export default Login