import React, { FC } from "react";
import { Form } from "react-final-form";
import { loginFormRender } from "./Helpers/loginFormRender";
import { FormValues } from "./LoginContainer";

export interface Captcha {
    url: string | null;
}

type LoginFormProps = {
    submitForm: (formValues: FormValues) => void;
    captcha: Captcha;
    loginFailed: string | null;
};

const Login: FC<LoginFormProps> = ({ submitForm, loginFailed, captcha }) => {
    return (
        <>
            <Form
                onSubmit={submitForm}
                render={loginFormRender(loginFailed, captcha)}
            />
        </>
    );
};

export default Login;
